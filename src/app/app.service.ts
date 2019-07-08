import { Injectable } from '@angular/core';
import { ToDo} from './models/todo';

@Injectable({
  providedIn: 'root'
})
export class AppService {

constructor() { }
  getTasks(){
    return [new ToDo(1, 'Estudar Angular', new Date().toLocaleString())];
  }
}
