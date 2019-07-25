import { Injectable } from '@angular/core';
import { ToDo} from '../models/todo';
import { List} from '../models/List';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  toDoKeyLocalStorage = 'todos';
  listKeyLocalStorage = 'list';
  
  private listSelectedSource = new Subject<number>();

  listSelected = this.listSelectedSource.asObservable();

  constructor() { }

  onListSelected(idList: number) {
    this.listSelectedSource.next(idList);
  }  

  getAllToDo(listId: number): Array<ToDo> {
    return this.getToDosFromLocalStorage().filter((x: ToDo) => x.idList === listId);
  }

  getList(listId: number): List {
    const lists = this.getListFromLocalStorage();
    let list = null;
    lists.forEach(element => {
      if (element.id === listId){
        list = element;
      }
    });

    return list;
  }  

  insertToDo(todo: ToDo) {
    const todos = this.getToDosFromLocalStorage();
    todo.id = todos.length + 1;
    todo.done = todo.done || false;
    todo.star = todo.star || false;
    todos.push(todo);
    this.setToDosToLocalStorage(todos);
  }

  deleteToDo(todoId: number) {
    let todos = this.getToDosFromLocalStorage();
    todos = todos.filter((x: ToDo) => x.id !== todoId);
    this.setToDosToLocalStorage(todos);
  }

  updateToDo(todo: ToDo) {
    const todos = this.getToDosFromLocalStorage();
    todos.forEach((x: ToDo) => {
      if (x.id === todo.id) {
        x.done = todo.done;
        x.name = todo.name;
        x.star = todo.star;
      }
    });

    this.setToDosToLocalStorage(todos);
  }

  getPersonalizedList(): Array<List> {
    return this.getListFromLocalStorage().filter( (x: List) => !x.defaul);
  }

  insertList(list: List) {
    const newList = this.getListFromLocalStorage();
    list.id = newList.length + 1;
    list.defaul = false;
    newList.push(list);
    this.setListToLocalStorage(newList);
  }

  deleteList(listId: number) {
    let newList = this.getListFromLocalStorage();
    newList = newList.filter((x: List) => x.id !== listId);
    this.setListToLocalStorage(newList);
  }

  getListFromLocalStorage(): Array<List> {
    const list = JSON.parse(localStorage.getItem(this.listKeyLocalStorage));
    return list || [new List({name: 'Task', id: 1, defaul: true })];
  }

  setListToLocalStorage(list: List[]) {
    const newList = JSON.stringify(list);
    localStorage.setItem(this.listKeyLocalStorage, newList);
  }

  getToDosFromLocalStorage(): Array<ToDo> {
    const todos = JSON.parse(localStorage.getItem(this.toDoKeyLocalStorage));
    return todos || [];
  }

  setToDosToLocalStorage(todos: ToDo[]) {
    const newTodos = JSON.stringify(todos);
    localStorage.setItem(this.toDoKeyLocalStorage, newTodos);
  }
}
