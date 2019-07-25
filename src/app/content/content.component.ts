import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription }   from 'rxjs';

import { ToDo} from '../models/todo';
import { MainService } from '../main/main.service';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {

  checkoutForm;
  taskText: string;
  todosDone: Array<ToDo>;
  todosNotDone: Array<ToDo>;
  idlist: number;
  subscription: Subscription;

  constructor(private formBuilder: FormBuilder, private mainService: MainService, public dialog: MatDialog) {
    
    this.subscription = mainService.listSelected.subscribe(
      idListSelected => {
        this.idlist = idListSelected;
        this.todosDone = this.mainService.getToDos(this.idlist, true);
        this.todosNotDone = this.mainService.getToDos(this.idlist, false);
        let task = this.mainService.getList(this.idlist);
        this.taskText = task.name;
    });

    this.checkoutForm = this.formBuilder.group({
      todoName: ''
    });

    this.idlist = 1;
   }

  ngOnInit() {
    this.todosDone = this.mainService.getToDos(this.idlist, true);
    this.todosNotDone = this.mainService.getToDos(this.idlist, false);
    let task = this.mainService.getList(this.idlist);
    this.taskText = task.name;    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }  

  getTotalToDoNotDone(): number {
    return this.todosNotDone.length;
  }

  getTotalToDoDone(): number {
    return this.todosDone.length;
  }

  changeStarState(todo: ToDo) {

    let listTemp = this.todosDone;

    if (!todo.done){
      listTemp = this.todosNotDone;
    }

    listTemp.forEach(element => {
      if (element.id === todo.id) {
        element.star = !element.star;
        this.mainService.updateToDo(todo);
      }
    });
  }

  markAsCompleted(todo: ToDo) {
    todo.done = true;

    this.todosDone.push(todo);
    this.todosNotDone = this.todosNotDone.filter(x => x.id !== todo.id);
    this.mainService.updateToDo(todo);
  }

  markAsNotCompleted(todo: ToDo) {
    todo.done = false;

    this.todosNotDone.push(todo);
    this.todosDone = this.todosDone.filter(x => x.id !== todo.id);
    this.mainService.updateToDo(todo);
  }

  onAddToDo(todoForm) {
    if (!(todoForm.todoName === null || todoForm.todoName === '')) {
      const newTodo = new ToDo({id: 0, name: todoForm.todoName, dateCreate: new Date(), idList: this.idlist, star: false});
      this.todosNotDone.push(newTodo);
      this.mainService.insertToDo(newTodo);
      this.checkoutForm.reset();
    }
  }

  deleteToDo(todo: ToDo) {

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {message: 'Are you sure you want to permanently delete this todo?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== undefined && result) {
        if (todo.done) {
          this.todosDone = this.todosDone.filter(x => x.id !== todo.id);
        } else {
        this.todosNotDone = this.todosNotDone.filter(x => x.id !== todo.id);
        }

        this.mainService.deleteToDo(todo.id);
      }
    });
  }
}
