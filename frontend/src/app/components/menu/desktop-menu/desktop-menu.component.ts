import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminService} from "../../../services/admin.service";
import {SocialUser} from "angular5-social-login";

@Component({
  selector: 'app-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss']
})
export class DesktopMenuComponent implements OnInit {

  @Input() userAdmin: SocialUser;

  @Output() onSignIn = new EventEmitter();
  @Output() onSignOut = new EventEmitter();

  constructor() {}

  public signOut() {
    this.onSignOut.emit();
  }

  ngOnInit() {
  }

}
