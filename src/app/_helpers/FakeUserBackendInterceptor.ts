import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../models/user';
import { List } from '../models/List';

@Injectable()
export class FakeUserBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const { url, method, headers, body } = request;
        const userDatabase = 'users';
        const listKeyLocalStorage = 'list'; 

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(1000))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                default:
                    return next.handle(request);
            }
        }

        function register() {
            const {firstName, lastName, email, password} = body;
            const users = getUsersFromLocalStorage();

            if (users.find((x : User) => x.email === email)) {
                return error('email "' + email + '" is already taken');
            }

            const user = new User({firstName, lastName, email, password});
            user.id = users.length + 1;
            users.push(user);
            setUsersToLocalStorage(users);

            const lists = getListFromLocalStorage();
            lists.push(new List({ id: 1, name: 'Task', defaul: true }));
            lists.push(new List({ id: 2, name: 'Starred', defaul: true }));
            setListToLocalStorage(lists);
            
            return ok({message: 'ok'});
        }

        function authenticate() {
            const { email, password } = body;

            const users = getUsersFromLocalStorage();
            const  usuario = users.filter((x: User) => x.email === email && x.password === password);

            if (!usuario || usuario.length === 0) {
                return error('Email or password is incorrect');
            }

            if (usuario.length > 0) {
                return ok({
                    id: usuario[0].id,
                    firstName: usuario[0].firstName,
                    lastName: usuario[0].lastName,
                    email: usuario[0].email
                });
            }
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function getUsersFromLocalStorage(): Array<User> {
            const users  = JSON.parse(localStorage.getItem(userDatabase));
            return users || [];
        }

        function  setUsersToLocalStorage(users: Array<User>) {
            const newUsers  = JSON.stringify(users);
            localStorage.setItem(userDatabase, newUsers);
        }

        function getListFromLocalStorage(): Array<List> {
            const list = JSON.parse(localStorage.getItem(this.listKeyLocalStorage));
            return list || [];
          }
        
        function setListToLocalStorage(list: List[]) {
            const newList = JSON.stringify(list);
            localStorage.setItem(listKeyLocalStorage, newList);
        }        
    }
}

export const fakeUserBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeUserBackendInterceptor,
    multi: true
};