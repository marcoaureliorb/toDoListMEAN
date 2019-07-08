import { Component, OnInit } from '@angular/core';
import { ToDo} from '../models/todo';
import { FormBuilder } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  checkoutForm;
  taskText: string;
  errMsg: string;

  constructor(private formBuilder: FormBuilder, private appService: AppService) {
    this.checkoutForm = this.formBuilder.group({
      todoName: ''
    });
   }

  ngOnInit() {
  }

  getTotalToDoToComplete() {
    return this.appService.getAllTodos().filter(x => !x.done).length;
  }

  getTotalToDoDone() {
    return this.appService.getAllTodos().filter(x => x.done).length;
  }

  todosNotDone() {
    return this.appService.getAllTodos().filter(x => !x.done);
  }

  todosDone() {
    return this.appService.getAllTodos().filter(x => x.done);
  }

  markAsCompleted(todo: ToDo) {
    this.appService.markAsCompleted(todo);
  }

  createToDo(name: string) {
    return new ToDo(0, name, new Date().toLocaleString());
  }

  onAddToDo(todoForm) {

    if (!(todoForm.todoName == undefined || todoForm.todoName == '')) {
      const newTodo = this.createToDo(todoForm.todoName);
      this.appService.insert(newTodo);
      this.checkoutForm.reset();
      this.errMsg = '';
    }
  }

  deleteToDo(todo: ToDo) {
    this.appService.delete(todo.id);
  }
}
