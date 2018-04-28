import { Injectable }     from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AdminService} from "../services/admin.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private admin: AdminService,
    private router: Router
  ){}

  canActivate() {
    if(this.admin.user) {
      return true;
    } else {
      this.redirectToLogin();
    }
  }

  private redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
