import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ToDo} from '../models/todo';
import { List } from '../models/List';
import { ContentService } from './content.service';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  checkoutForm;
  personalizedListForm;
  taskText: string;
  todosDone: Array<ToDo>;
  todosNotDone: Array<ToDo>;
  personalizedList: Array<List>;
  idlist: number;

  constructor(private formBuilder: FormBuilder, private contentService: ContentService, public dialog: MatDialog) {
    this.checkoutForm = this.formBuilder.group({
      todoName: ''
    });

    this.personalizedListForm = this.formBuilder.group({
      listName: ''
    });

    this.idlist = 1;
    console.log('ContentComponent_constructor');
   }

  ngOnInit() {
    this.todosDone = this.contentService.getToDos(this.idlist, true);
    this.todosNotDone = this.contentService.getToDos(this.idlist, false);
    this.personalizedList = this.contentService.getPersonalizedList();
    console.log(this.personalizedList);
    console.log('ContentComponent_ngOnInit');
  }

  getTotalToDoNotDone(): number {
    return this.todosNotDone.length;
  }

  getTotalToDoDone(): number {
    return this.todosDone.length;
  }

  changeStarState(todo: ToDo) {
    this.todosNotDone.forEach(element => {
      if (element.id === todo.id) {
        element.star = !element.star;
      }
    });
  }

  markAsCompleted(todo: ToDo) {
    todo.done = true;

    this.todosDone.push(todo);
    this.todosNotDone = this.todosNotDone.filter(x => x.id !== todo.id);
    this.contentService.updateToDo(todo);
  }

  markAsNotCompleted(todo: ToDo) {
    todo.done = false;

    this.todosNotDone.push(todo);
    this.todosDone = this.todosDone.filter(x => x.id !== todo.id);
    this.contentService.updateToDo(todo);
  }

  onAddPersonalizedList(personalizedListForm) {
      const newPersonalizedList = new List({name: personalizedListForm.listName});
      this.personalizedList.push(newPersonalizedList);
      this.contentService.insertList(newPersonalizedList);
      this.personalizedListForm.reset();
  }

  onAddToDo(todoForm) {
    if (!(todoForm.todoName === null || todoForm.todoName === '')) {
      const newTodo = new ToDo({id: 0, name: todoForm.todoName, dateCreate: new Date(), idList: this.idlist, star: false});
      this.todosNotDone.push(newTodo);
      this.contentService.insertToDo(newTodo);
      this.checkoutForm.reset();
    }
  }

  deleteToDo(todo: ToDo) {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {message: 'Do you delete this todo?' , title: 'Confirm' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== undefined && result) {
        if (todo.done) {
          this.todosDone = this.todosDone.filter(x => x.id !== todo.id);
        } else {
        this.todosNotDone = this.todosNotDone.filter(x => x.id !== todo.id);
        }

        this.contentService.deleteToDo(todo.id);
      }
    });
  }

  deletePersonalizedList(list: List) {
    this.personalizedList = this.personalizedList.filter(x => x.id !== list.id);
    this.contentService.deleteList(list.id);
  }
}
