import { Injectable } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from "angular5-social-login";
import { HttpClient } from "@angular/common/http";
import { User } from "../interfaces/user";
import { apiUrl } from "../../environments/environment";
import {Router} from "@angular/router";


@Injectable()
export class AdminService {

  public user: SocialUser;

  constructor(
    private socialAuthService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public socialSignIn() {

    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (user: SocialUser) => {
        this.user = user;
        console.log(user);
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['/']);
      }
    )
  }

  public socialSignOut(){
    this.socialAuthService.signOut().then( () => {
      this.user = null;
      localStorage.removeItem('user');
    });
    this.router.navigate(['/login']);
  }

  public getToken(){
    return this.user.idToken;
  }

}
