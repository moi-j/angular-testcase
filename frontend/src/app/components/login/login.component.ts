import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
