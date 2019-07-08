import { Injectable } from '@angular/core';
import { ToDo} from './models/todo';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  toDoKeyLocalStorage = 'todos';

  constructor() { }

  getAllTodosNotDone(): Array<ToDo> {
    return this.getToDosFromLocalStorage().filter((x: ToDo) => !x.done);
  }

  getAllTodosDone(): Array<ToDo> {
    return this.getToDosFromLocalStorage().filter((x: ToDo) => x.done);
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
        element.dateComplete = new Date();
        element.done = true;
      }
    });

    this.setToDosToLocalStorage(todos);
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
