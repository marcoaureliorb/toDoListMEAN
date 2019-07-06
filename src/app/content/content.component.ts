import { Component, OnInit } from '@angular/core';
import { ToDo } from '../models/todos';
import { FormBuilder } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  
  checkoutForm;
  todos = [];
  todosDone = [];
  taskText: string;
  errMsg: string;

  constructor(private formBuilder: FormBuilder, private appService: AppService) {
    this.checkoutForm = this.formBuilder.group({
      taskName: ''
    });    
   }

  ngOnInit() {
    this.todos = this.appService.getTasks();
  }

  getTotalToDoToComplete(){
    return this.todos.length;
  }

  getTotalToDoDone(){
    return this.todosDone.length;
  }  

  markAsCompleted(todo){
    this.todos = this.todos.filter(x => x.id != todo.id);
    todo.dateCompleteStr = new Date().toLocaleString();
    this.todosDone.push(todo);
  }

  createToDo(todo){
    var newToDo = new ToDo();
    newToDo.name = todo.taskName;
    newToDo.dateStr = new Date().toLocaleString();
    newToDo.done = false;
    newToDo.id = this.todos.length;
    return newToDo;
  }  

  onAddToDo(todo) {
    
    if (todo.taskName == undefined || todo.taskName == ''){
      this.errMsg = 'Task is not clear';
      
      setTimeout(() => {
        this.errMsg = null;
      }, 2000);
    }
    else{
      this.todos.push(this.createToDo(todo));
      this.checkoutForm.reset();
      this.errMsg = '';
    }
  }

  editToDo(todo) {
    
  }

  deleteToDo(todo){
    this.todos = this.todos.filter(x => x.id != todo.id);
  }

  deleteToDoDone(todo){
    this.todosDone = this.todosDone.filter(x => x.id != todo.id);
  }  
}
