import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private admin: AdminService,
  ) {}

  public socialSignOut() {
    this.admin.socialSignOut();
  }

  ngOnInit() {

  }
}
