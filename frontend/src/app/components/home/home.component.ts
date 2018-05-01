import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersListComponent} from "../users-list/users-list.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(UsersListComponent) userList;

  constructor() { }

  ngOnInit() {
  }

}
