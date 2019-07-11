import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ToDo} from '../models/todo';
import { ContentService } from './content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  checkoutForm;
  taskText: string;
  todosDone: Array<ToDo>;
  todosNotDone: Array<ToDo>;
  listName: string;

  constructor(private formBuilder: FormBuilder, private contentService: ContentService) {
    this.checkoutForm = this.formBuilder.group({
      todoName: ''
    });

    this.listName = 'default';
   }

  ngOnInit() {
    this.todosDone = this.contentService.getAllTodosDone(this.listName);
    this.todosNotDone = this.contentService.getAllTodosNotDone(this.listName);
  }

  getTotalToDoNotDone(): number {
    return this.todosNotDone.length;
  }

  getTotalToDoDone(): number {
    return this.todosDone.length;
  }

  markAsCompleted(todo: ToDo) {

    todo.dateComplete = new Date();
    todo.done = true;

    this.todosDone.push(todo);

    this.todosNotDone = this.todosNotDone.filter(x => x.id !== todo.id);

    this.contentService.markAsCompleted(todo);
  }

  onAddToDo(todoForm) {

    console.log(todoForm);
    console.log(todoForm.todoName);
    if (!(todoForm.todoName === null || todoForm.todoName === '')) {
      const newTodo = new ToDo({id: 0, name: todoForm.todoName, dateCreate: new Date(), list: this.listName});
      this.todosNotDone.push(newTodo);
      this.contentService.insert(newTodo);
      this.checkoutForm.reset();
    }
  }

  deleteToDo(todo: ToDo) {

    if (todo.done) {
      this.todosDone = this.todosDone.filter(x => x.id !== todo.id);
    } else {
      this.todosNotDone = this.todosNotDone.filter(x => x.id !== todo.id);
    }

    this.contentService.delete(todo.id);
  }
}
