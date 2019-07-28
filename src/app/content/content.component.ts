import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { List } from '../models/List';
import { ToDo } from '../models/todo';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { AuthenticationService } from '../_services/AuthenticationService';
import { MainService } from '../_services/main.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {

  fbToDo;
  todos: Array<ToDo>;
  activeList: List;
  subscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private mainService: MainService,
              private authenticationService: AuthenticationService,
              public dialog: MatDialog) {

    this.subscription =
      mainService.listSelected.subscribe(x => {
        this.activeList = x;
        this.loadToDos();
      });

    this.fbToDo = this.formBuilder.group({
      todoName: ''
    });

    this.activeList = new List({id: 1, name: 'Tasks'});
    this.todos = [];
   }

  loadToDos() {
    this.mainService
      .getToDos(this.authenticationService.currentUserValue.id, this.activeList.id)
      .subscribe(todos => this.todos = todos);
  }

  ngOnInit() {
    this.loadToDos();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTotalToDo(): number {
    return this.todos.filter((x: ToDo) => !x.done).length;
  }

  changeStarState(todo: ToDo) {
    todo.star = !todo.star;
    this.mainService.updateToDo(todo).subscribe();
  }

  changeCompleteState(todo: ToDo) {
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
                    idList: this.activeList.id,
                    star: false,
                    idUser: this.authenticationService.currentUserValue.id});

      this.mainService
        .insertTodo(newTodo)
        .subscribe(x => {
          newTodo.id = x;
          this.todos.push(newTodo);
          this.fbToDo.reset();
        });
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
          .subscribe(x => { this.todos = this.todos.filter(x => x.id !== todo.id); });
      }
    });
  }
}
