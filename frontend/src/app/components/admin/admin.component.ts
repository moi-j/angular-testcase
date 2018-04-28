import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material";
import { User } from "../../interfaces/user";
import { UserFormComponent } from "./user-form/user-form.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  openDialog( user: User = null ): void {
    let dialogConfig = {
      data: user
    }
    let dialogRef = this.dialog.open( UserFormComponent, dialogConfig )
  }

}
