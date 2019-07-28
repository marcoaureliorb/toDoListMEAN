import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { List } from '../models/List';
import { ToDo } from '../models/todo';

@Injectable()
export class FakeTodoBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const { url, method, headers, body } = request;
    const toDoKeyLocalStorage = 'todos';

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(1000))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/todo/all') && method === 'POST':
          return getAllTodos();
        case url.endsWith('/todo/insert') && method === 'POST':
          return insertToDo();
        case url.endsWith('/todo/delete') && method === 'POST':
          return deleteToDo();
        case url.endsWith('/todo/update') && method === 'POST':
          return updateToDo();
        default:
          return next.handle(request);
      }
    }

    function getAllTodos(){
      
      const { idUser, idList } = body;
      
      return ok(getToDosFromLocalStorage().filter((x: ToDo) => x.idUser === idUser && x.idList === idList));
    }

    function insertToDo() {
      
      const {newTodo} = body;

      const todos = getToDosFromLocalStorage();
      
      newTodo.id = todos.length + 1;
      newTodo.done = newTodo.done || false;
      newTodo.star = newTodo.star || false;
      
      todos.push(newTodo);
      
      setToDosToLocalStorage(todos);

      return ok();
    }

    function deleteToDo() {

      const { idTodo } = body;

      let todos = getToDosFromLocalStorage();

      todos = todos.filter((x: ToDo) => x.id !== idTodo);
      
      setToDosToLocalStorage(todos);

      return ok();
    }

    function updateToDo() {
      
      const { todo } = body;

      const todos = getToDosFromLocalStorage();

      todos.forEach((x: ToDo) => {
        if (x.id === todo.id) {
          x.done = todo.done;
          x.name = todo.name;
          x.star = todo.star;
        }
      });

      setToDosToLocalStorage(todos);

      return ok();
    }

    function getToDosFromLocalStorage(): Array<ToDo> {
      const todos = JSON.parse(localStorage.getItem(toDoKeyLocalStorage));
      return todos || [];
    }

    function setToDosToLocalStorage(todos: ToDo[]) {
      const newTodos = JSON.stringify(todos);
      localStorage.setItem(toDoKeyLocalStorage, newTodos);
    }

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }
  }
}

export const fakeTodoBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeTodoBackendInterceptor,
  multi: true
};