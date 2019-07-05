import { Component, OnInit } from '@angular/core';
import { ToDo } from '../models/todos';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  todos = [];
  taskText: string;
  totalTaskToComplete = 0;

  constructor() {
    this.todos = [];
    this.taskText = '';
   }

  ngOnInit() {
  }

  addToDo() {
    const todo = new ToDo();
    todo.name = 'teste';
    todo.dateStr = 'Dec 25, 2008 8:03 pm';
    todo.done = false;

    this.todos.push(todo);
    this.totalTaskToComplete++;
  }
}
