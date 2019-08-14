import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { List } from '../models/List';
import { ToDo } from '../models/todo';

@Injectable()
export class FakeListBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const { url, method, body } = request;
        const toDoKeyLocalStorage = 'todos';
        const listKeyLocalStorage = 'list';

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(300))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/list/lists') && method === 'POST':
                    return getLists();
                case url.endsWith('/list/insert') && method === 'POST':
                    return insertList();
                    case url.endsWith('/list/delete') && method === 'POST':
                      return deleteList();
                default:
                    return next.handle(request);
            }
        }

        function getLists() {
            const {idUser, defaultList} = body;
            const lists = getListFromLocalStorage();

            const result = lists.filter((x: List) => x.idUser === idUser && x.defaul === defaultList);

            return ok(result);
        }

        function insertList() {
          const newList = new List({name: body.name, defaul: body.defaul, idUser: body.idUser });
          const lists = getListFromLocalStorage();

          newList.id = lists.length + 1;
          lists.push(newList);
          setListToLocalStorage(lists);

          return ok(newList.id);
        }

        function deleteList() {
          const idList = body;
          let newList = getListFromLocalStorage();
          newList = newList.filter((x: List) => x.id !== idList);
          setListToLocalStorage(newList);
          deleteToDoFromList(idList);

          return ok(idList);
        }

        function deleteToDoFromList(listId: number) {
          let todos = getToDosFromLocalStorage();
          todos = todos.filter((x: ToDo) => x.idList !== listId);
          setToDosToLocalStorage(todos);
        }

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function getListFromLocalStorage(): Array<List> {
          const lists = JSON.parse(localStorage.getItem(listKeyLocalStorage));
          return lists || [];
        }

        function getToDosFromLocalStorage(): Array<ToDo> {
          const todos = JSON.parse(localStorage.getItem(toDoKeyLocalStorage));
          return todos || [];
        }

        function setListToLocalStorage(list: List[]) {
            const newList = JSON.stringify(list);
            localStorage.setItem(listKeyLocalStorage, newList);
        }

        function setToDosToLocalStorage(todos: ToDo[]) {
          const newTodos = JSON.stringify(todos);
          localStorage.setItem(toDoKeyLocalStorage, newTodos);
        }
    }
}

export const fakeListBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeListBackendInterceptor,
    multi: true
};
