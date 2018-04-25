import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor( private _admin: AdminService ) {}

  public socialSignIn() {
    this._admin.socialSignIn();
  }
  public socialSignOut() {
    this._admin.socialSignOut();
  }

  ngOnInit() {
  }

}
