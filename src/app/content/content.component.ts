import { Component, OnInit } from '@angular/core';
import { ToDo } from '../models/todos';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  todos = [];
  todosDone = [];
  taskText: string;

  constructor() {
    this.initComDadosFake();
   }

  ngOnInit() {
  }

  getTotalToDoToComplete(){
    return this.todos.length;
  }

  getTotalToDoDone(){
    return this.todosDone.length;
  }  

  initComDadosFake(){
    this.todos = [this.getTodoFake(), this.getTodoFake(), this.getTodoFake()];
    this.todosDone = [this.getTodoDoneFake(), this.getTodoDoneFake(), this.getTodoDoneFake()];
  }
  markAsCompleted(){
    console.log('completed');
  }

  addToDo() {
    this.todos.push(this.getTodoFake());
  }

  getTodoFake(){
    var todo = new ToDo();
    todo.name = 'teste todo';
    todo.dateStr = 'Dec 25, 2008 8:03 pm';
    todo.done = false;

    return todo;
  }

  getTodoDoneFake(){
    var todo = new ToDo();
    todo.name = 'teste todo done';
    todo.dateStr = 'Dec 25, 2008 8:03 pm';
    todo.dateCompleteStr = 'Apr 18, 2009 11:03 am';
    todo.done = true;

    return todo;
  }  
}
