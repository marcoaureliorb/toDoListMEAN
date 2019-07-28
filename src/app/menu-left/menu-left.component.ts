import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { List } from '../models/List';
import { MainService } from '../_services/main.service';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../_services/AuthenticationService';

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.css']
})
export class MenuLeftComponent implements OnInit {

  defaultList: Array<List>;
  personalizedList: Array<List>;
  personalizedListForm;
  idlist: number;

  constructor(private formBuilder: FormBuilder, 
              private mainService: MainService, 
              private authenticationService: AuthenticationService,
              public dialog: MatDialog) {

    this.personalizedListForm = this.formBuilder.group({
      listName: ''
    });

    this.idlist = 1;
  }

  ngOnInit() {
    this.mainService
      .getLists(this.authenticationService.currentUserValue.id, true)
      .subscribe(x => this.defaultList = x);

    this.mainService
      .getLists(this.authenticationService.currentUserValue.id, false)
      .subscribe(x => this.personalizedList = x);
  }

  onAddPersonalizedList(personalizedListForm) {
    if (!(personalizedListForm.listName === null || personalizedListForm.listName === '')) {

      const newPersonalizedList = new List({name: personalizedListForm.listName});
      this.personalizedList.push(newPersonalizedList);

      this.mainService
        .insertList(newPersonalizedList)
        .subscribe(x => this.personalizedListForm.reset());
    }
  }

  onListSelected(list: List) {
    list.id = list.id || this.authenticationService.currentUserValue.id;
    list.defaul = list.defaul || (list.id === 1 || list.id === 2);
    this.mainService.onListSelected(list);
  }

  deletePersonalizedList(list: List) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {message: 'Are you sure you want to permanently delete this list?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result) {
        this.personalizedList = this.personalizedList.filter(x => x.id !== list.id);
        this.mainService.deleteList(list.id).subscribe(x => this.mainService.onListSelected(new List({id: 1})));
      }
    });
  }
}
