import { Injectable } from '@angular/core';
import { ToDo} from './models/todo';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  toDoKeyLocalStorage : string = "todos";

  constructor() { }
  
  getAllTodos(){
    return this.getToDosFromLocalStorage();
  }

  insert(todo: ToDo){
    let todos = this.getToDosFromLocalStorage();
    todo.id = todos.length + 1;
    todos.push(todo);
    this.setToDosToLocalStorage(todos);
  }

  delete(id: number){
    let todos = this.getToDosFromLocalStorage();
    todos = todos.filter(x => x.id != id);
    this.setToDosToLocalStorage(todos);       
  }

  update(todo: ToDo){
    let todos = this.getToDosFromLocalStorage();
    todos = todos.filter(x => x.id != todo.id);
    todos.push(todo);
    this.setToDosToLocalStorage(todos);    
  }

  markAsCompleted(todo: ToDo){
    let todos = this.getToDosFromLocalStorage();
    todos.forEach(element => {
      console.log(element);
      if(element.id == todo.id){
        element.dateCompleteStr = new Date().toLocaleString();
        element.done = true;
      }
    });
    
    console.log("Gravando");
    this.setToDosToLocalStorage(todos);
    console.log("Gravou");
  }

  getToDosFromLocalStorage(){
    let todos = JSON.parse(localStorage.getItem(this.toDoKeyLocalStorage));
    return todos || [];
  }

  setToDosToLocalStorage(todos: ToDo[]){
    let _todos = JSON.stringify(todos);
    localStorage.setItem(this.toDoKeyLocalStorage, _todos);
  }
}