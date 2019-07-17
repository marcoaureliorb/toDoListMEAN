import { Injectable } from '@angular/core';

import { ToDo} from '../models/todo';
import { PersonalizedList} from '../models/personbalizedList';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
 
  toDoKeyLocalStorage = 'todos';
  personalizedList = 'personalizedList';

  constructor() { }

  getPersonalizedList(): Array<PersonalizedList>{
    return this.getPersonalizedListFromLocalStorage();
  }
  getAllTodosNotDone(listName: string): Array<ToDo> {
    return this.getToDosFromLocalStorage().filter((x: ToDo) => !x.done && x.list === listName);
  }

  getAllTodosDone(listName: string): Array<ToDo> {
    return this.getToDosFromLocalStorage().filter((x: ToDo) => x.done && x.list === listName);
  }

  insertPersonalizedList(list: PersonalizedList) {
    const personalizedList = this.getPersonalizedListFromLocalStorage();
    personalizedList.push(list);
    this.setPersonalizedListToLocalStorage(personalizedList);    
  }  

  insert(todo: ToDo) {
    const todos = this.getToDosFromLocalStorage();
    todo.id = todos.length + 1;
    todos.push(todo);
    this.setToDosToLocalStorage(todos);
  }

  delete(id: number) {
    let todos = this.getToDosFromLocalStorage();
    todos = todos.filter((x: ToDo) => x.id !== id);
    this.setToDosToLocalStorage(todos);
  }

  update(todo: ToDo) {
    let todos = this.getToDosFromLocalStorage();
    todos = todos.filter((x: ToDo) => x.id !== todo.id);
    todos.push(todo);
    this.setToDosToLocalStorage(todos);
  }

  markAsCompleted(todo: ToDo) {
    const todos = this.getToDosFromLocalStorage();
    todos.forEach((element: ToDo) => {
      if (element.id === todo.id) {
        element.done = true;
      }
    });

    this.setToDosToLocalStorage(todos);
  }

  markAsNotCompleted(todo: ToDo) {
    const todos = this.getToDosFromLocalStorage();
    todos.forEach((element: ToDo) => {
      if (element.id === todo.id) {
        console.log(element);
        element.done = false;
      }
    });

    this.setToDosToLocalStorage(todos);
  }  

  getPersonalizedListFromLocalStorage(){
    const personalizedList = JSON.parse(localStorage.getItem(this.personalizedList));
    return personalizedList || [];
  }

  setPersonalizedListToLocalStorage(personalizedList: PersonalizedList[]){
    const newPersonalizedList = JSON.stringify(personalizedList);
    localStorage.setItem(this.personalizedList, newPersonalizedList);
  }

  getToDosFromLocalStorage() {
    const todos = JSON.parse(localStorage.getItem(this.toDoKeyLocalStorage));
    return todos || [];
  }

  setToDosToLocalStorage(todos: ToDo[]) {
    const newTodos = JSON.stringify(todos);
    localStorage.setItem(this.toDoKeyLocalStorage, newTodos);
  }
}
