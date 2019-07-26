import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription }   from 'rxjs';

import { ToDo} from '../models/todo';
import { MainService } from '../_services/main.service';
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
  todos: Array<ToDo>;
  idlist: number;
  subscription: Subscription;

  constructor(private formBuilder: FormBuilder, private mainService: MainService, public dialog: MatDialog) {
    
    this.subscription = mainService.listSelected.subscribe(
      idListSelected => {
        this.idlist = idListSelected;
        this.todos = this.mainService.getAllToDo(this.idlist);
        let task = this.mainService.getList(this.idlist);
        this.taskText = task.name;
    });

    this.checkoutForm = this.formBuilder.group({
      todoName: ''
    });

    this.idlist = 1;
   }

  ngOnInit() {
    this.todos = this.mainService.getAllToDo(this.idlist);
    let task = this.mainService.getList(this.idlist);
    this.taskText = task.name;    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }  

  getTotalToDo(): number {
    return this.todos.filter((x: ToDo) => !x.done).length;
  }

  changeStarState(todo: ToDo) {
    this.todos.forEach(element => {
      if (element.id === todo.id) {
        element.star = !element.star;
        this.mainService.updateToDo(todo);
      }
    });
  }

  changeCompleteState(todo: ToDo) {
    todo.done = !todo.done;
    this.mainService.updateToDo(todo);
  }

  onAddToDo(todoForm) {
    if (!(todoForm.todoName === null || todoForm.todoName === '')) {
      const newTodo = new ToDo({id: 0, name: todoForm.todoName, dateCreate: new Date(), idList: this.idlist, star: false});
      this.todos.push(newTodo);
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
        this.todos = this.todos.filter(x => x.id !== todo.id);
        this.mainService.deleteToDo(todo.id);
      }
    });
  }
}
