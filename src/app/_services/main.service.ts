import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { List } from '../models/List';
import { ToDo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private listSelectedSource = new Subject<List>();
  listSelected = this.listSelectedSource.asObservable();

  constructor(private http: HttpClient) { }

  onListSelected(list: List) {
    this.listSelectedSource.next(list);
  }

  getLists(idUser: number, defaultList: boolean) {
    return this.http
    .post<Array<List>>('http://localhost:4200/list/lists', { idUser, defaultList });
  }

  insertList(newList: List) {
    return this.http
      .post<number>('http://localhost:4200/list/insert', newList);
  }

  deleteList(idList: number) {
    return this.http
    .post<number>('http://localhost:4200/list/delete', idList);
  }

  deleteToDo(idTodo: number) {
    return this.http
    .post<any>('http://localhost:4200/todo/delete', idTodo);
  }

  insertTodo(newTodo: ToDo) {
    return this.http
    .post<number>('http://localhost:4200/todo/insert', newTodo);
  }

  updateToDo(todo: ToDo) {
    return this.http
    .post<any>('http://localhost:4200/todo/update', todo);
  }

  getToDos(idUser: number, idList: number) {
    return this.http
    .post<any>('http://localhost:4200/todo/all', { idUser, idList });
  }
}
