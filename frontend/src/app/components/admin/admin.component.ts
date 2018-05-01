import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {MatDialog, MatSnackBar} from "@angular/material";

import { User } from "../../interfaces/user";

import { UserFormComponent } from "./user-form/user-form.component";
import { UsersListComponent } from "../users-list/users-list.component";
import {Subject} from "rxjs/Subject";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  @ViewChild(UsersListComponent) userList;

  private destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }


  openDialog( user: User = null ): void {
    let dialogConfig = {
      data: user
    };
    this.dialog.open( UserFormComponent, dialogConfig ).afterClosed().pipe(takeUntil(this.destroy$)).subscribe( user => {
      (user) ? this.userList.refresh() : false;
    }, err => {
      this.snackBar.open(
        'There was an error refreshing the list. Try to reload this page.',
        'Ok');
    });
  }

  ngOnDestroy(){
    this.dialog.closeAll();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
