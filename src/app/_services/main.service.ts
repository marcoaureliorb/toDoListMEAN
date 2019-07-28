import { Injectable } from '@angular/core';
import { ToDo} from '../models/todo';
import { List} from '../models/List';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    .post<any>('http://localhost:4200/list/lists', { idUser, defaultList })
    .pipe(map(list => { return list; }));
  }

  insertList(newPersonalizedList: List) {
    return this.http
    .post<any>('http://localhost:4200/list/insert', newPersonalizedList);
  }  

  deleteList(idList: number) {
    return this.http
    .post<any>('http://localhost:4200/list/delete', idList);
  }  

  deleteToDo(idTodo: number) {
    return this.http
    .post<any>('http://localhost:4200/todo/delete', idTodo);    
  }  

  insertTodo(newTodo: ToDo) {
    return this.http
    .post<any>('http://localhost:4200/todo/insert', newTodo);  
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
