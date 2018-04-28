import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users:User[];
  displayedColumns = ['id', 'first_name', 'last_name'];
  dataSource = new MatTableDataSource(this.users);

  constructor(
    private user: UserService
  ) {

  }

  ngOnInit() {
  }

  getUsers(){
    this.user.getUsers().subscribe( users => {
      console.log(users);
    }, err => {
      console.log(err);
    });
  }

}

