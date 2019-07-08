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
  todosDone: Array<ToDo>;
  todosNotDone: Array<ToDo>;

  constructor(private formBuilder: FormBuilder, private appService: AppService) {
    this.checkoutForm = this.formBuilder.group({
      todoName: ''
    });
   }

  ngOnInit() {
    this.todosDone = this.appService.getAllTodosDone();
    this.todosNotDone = this.appService.getAllTodosNotDone();
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

    this.appService.markAsCompleted(todo);
  }

  onAddToDo(todoForm) {

    console.log(todoForm);
    console.log(todoForm.todoName);
    if (!(todoForm.todoName === null || todoForm.todoName === '')) {
      const newTodo = new ToDo({id: 0, name: todoForm.todoName, dateCreate: new Date()});
      this.todosNotDone.push(newTodo);
      this.appService.insert(newTodo);
      this.checkoutForm.reset();
    }
  }

  deleteToDo(todo: ToDo) {

    if (todo.done) {
      this.todosDone = this.todosDone.filter(x => x.id !== todo.id);
    } else {
      this.todosNotDone = this.todosNotDone.filter(x => x.id !== todo.id);
    }

    this.appService.delete(todo.id);
  }
}
