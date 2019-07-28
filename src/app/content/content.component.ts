import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ToDo} from '../models/todo';
import { MainService } from '../_services/main.service';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../_services/AuthenticationService';
import { List } from '../models/List';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {

  checkoutForm;
  taskText: string;
  todos: Array<ToDo>;
  list: List;
  subscription: Subscription;

  constructor(private formBuilder: FormBuilder, 
              private mainService: MainService, 
              private authenticationService: AuthenticationService,
              public dialog: MatDialog) {

    this.subscription = 
      mainService.listSelected.subscribe(x => this.list = x);

    this.checkoutForm = this.formBuilder.group({
      todoName: ''
    });

    this.list = undefined;
   }

  ngOnInit() {

    this.mainService
      .getToDos(this.authenticationService.currentUserValue.id, this.list.id)
      .subscribe(todos => this.todos = todos);

    this.taskText = '';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTotalToDo(): number {
    return this.todos.filter((x: ToDo) => !x.done).length;
  }

  changeStarState(todo: ToDo) {
    todo.done = !todo.done;
    this.mainService.updateToDo(todo).subscribe();
  }

  onAddToDo(todoForm) {
    if (!(todoForm.todoName === null || todoForm.todoName === '')) {
      
      const newTodo =
        new ToDo({
                    id: 0, 
                    name: todoForm.todoName, 
                    dateCreate: new Date(), 
                    idList: this.list.id, 
                    star: false, 
                    idUser: this.authenticationService.currentUserValue.id});

      this.mainService
        .insertTodo(newTodo)
        .subscribe(x => {this.todos.push(newTodo); this.checkoutForm.reset();});
    }
  }

  deleteToDo(todo: ToDo) {

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {message: 'Are you sure you want to permanently delete this todo?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result) {

        this.mainService
          .deleteToDo(todo.id)
          .subscribe(x => { this.todos = this.todos.filter(x => x.id !== todo.id);});
      }
    });
  }
}
