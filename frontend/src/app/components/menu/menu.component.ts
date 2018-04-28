import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private admin: AdminService,
    private user: UserService
  ) {}

  public socialSignOut() {
    this.admin.socialSignOut();
  }

  ngOnInit() {

  }
}
