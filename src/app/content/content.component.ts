import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ToDo} from '../models/todo';
import { ContentService } from './content.service';
import { PersonalizedList } from '../models/personbalizedList';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  checkoutForm;
  personalizedListForm;
  taskText: string;
  todosDone: Array<ToDo>;
  todosNotDone: Array<ToDo>;
  personalizedList: Array<PersonalizedList>;
  listName: string;

  constructor(private formBuilder: FormBuilder, private contentService: ContentService) {
    this.checkoutForm = this.formBuilder.group({
      todoName: ''
    });

    this.personalizedListForm = this.formBuilder.group({
      listName: ''
    });

    this.listName = 'default';
    console.log('ContentComponent_constructor');
   }

  ngOnInit() {
    this.todosDone = this.contentService.getAllTodosDone(this.listName);
    this.todosNotDone = this.contentService.getAllTodosNotDone(this.listName);
    this.personalizedList = this.contentService.getPersonalizedList();
    console.log('ContentComponent_ngOnInit');
  }

  getTotalToDoNotDone(): number {
    return this.todosNotDone.length;
  }

  getTotalToDoDone(): number {
    return this.todosDone.length;
  }

  changeStarState(todo: ToDo){
    this.todosNotDone.forEach(element => {
      if(element.id == todo.id){
        element.star = !element.star;
      }
    });
  }

  markAsCompleted(todo: ToDo) {
    todo.done = true;

    this.todosDone.push(todo);

    this.todosNotDone = this.todosNotDone.filter(x => x.id !== todo.id);

    this.contentService.markAsCompleted(todo);
  }

  markAsNotCompleted(todo: ToDo){
    todo.done = false;

    this.todosNotDone.push(todo);

    this.todosDone = this.todosDone.filter(x => x.id !== todo.id);

    this.contentService.markAsNotCompleted(todo);    
  }

  onAddPersonalizedList(personalizedListForm){
      const newPersonalizedList = new PersonalizedList({id: this.personalizedList.length + 1, name: personalizedListForm.listName}); 
      this.personalizedList.push(newPersonalizedList);
      this.contentService.insertPersonalizedList(newPersonalizedList);
      this.personalizedListForm.reset();
  }

  onAddToDo(todoForm) {
    if (!(todoForm.todoName === null || todoForm.todoName === '')) {
      const newTodo = new ToDo({id: 0, name: todoForm.todoName, dateCreate: new Date(), list: this.listName, star: false});
      this.todosNotDone.push(newTodo);
      this.contentService.insert(newTodo);
      this.checkoutForm.reset();
    }
  }

  deleteToDo(todo: ToDo) {

    if (todo.done) {
      this.todosDone = this.todosDone.filter(x => x.id !== todo.id);
    } else {
      this.todosNotDone = this.todosNotDone.filter(x => x.id !== todo.id);
    }

    this.contentService.delete(todo.id);
  }
}
