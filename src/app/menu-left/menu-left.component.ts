import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { List } from '../models/List';
import { ContentService } from '../content/content.service';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private formBuilder: FormBuilder, private contentService: ContentService, public dialog: MatDialog) {
    this.personalizedListForm = this.formBuilder.group({
      listName: ''
    });

    this.idlist = 1;
  }

  ngOnInit() {
    this.defaultList = this.contentService.getListFromLocalStorage();
    this.personalizedList = this.contentService.getPersonalizedList();
  }

  onAddPersonalizedList(personalizedListForm) {
    const newPersonalizedList = new List({name: personalizedListForm.listName});
    this.personalizedList.push(newPersonalizedList);
    this.contentService.insertList(newPersonalizedList);
    this.personalizedListForm.reset();
  }

  deletePersonalizedList(list: List) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {message: 'Are you sure you want to permanently delete this list?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result) {
        this.personalizedList = this.personalizedList.filter(x => x.id !== list.id);
        this.contentService.deleteList(list.id);
      }
    });
  }
}
