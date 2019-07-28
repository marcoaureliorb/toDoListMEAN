import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { List } from '../models/List';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { AuthenticationService } from '../_services/AuthenticationService';
import { MainService } from '../_services/main.service';

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.css']
})
export class MenuLeftComponent implements OnInit {

  defaultList: Array<List>;
  personalizedList: Array<List>;
  fbListForm;
  taskList: List;

  constructor(private formBuilder: FormBuilder,
              private mainService: MainService,
              private authenticationService: AuthenticationService,
              public dialog: MatDialog) {

    this.fbListForm = this.formBuilder.group({
      Name: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.mainService
      .getLists(this.authenticationService.currentUserValue.id, false)
      .subscribe(x => this.personalizedList = x);

    this.mainService
      .getLists(this.authenticationService.currentUserValue.id, true)
      .subscribe(lists => {
        this.defaultList = lists;
        this.taskList = lists.filter((x: List) => x.id === 1)[0];
      });
  }

  onAddPersonalizedList(newList) {

    if (this.fbListForm.invalid) {
      return;
    }

    const list =
      new List({
        name: newList.Name,
        defaul: false,
        idUser: this.authenticationService.currentUserValue.id
      });

    this.mainService
      .insertList(list)
      .subscribe(x => {
        list.id = x;
        this.personalizedList.push(list);
        this.fbListForm.reset();
      });
  }

  onListSelected(list: List) {
    this.mainService.onListSelected(list);
  }

  deletePersonalizedList(list: List) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { message: 'Are you sure you want to permanently delete this list?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result) {

        this.mainService
          .deleteList(list.id)
          .subscribe(idList => {
            this.personalizedList = this.personalizedList.filter(x => x.id !== idList);
            this.mainService.onListSelected(this.taskList);
          });
      }
    });
  }
}
