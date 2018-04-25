import { Injectable } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from "angular5-social-login";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AdminService {

  public user: SocialUser;

  constructor(
    private socialAuthService: AuthService,
    private http: HttpClient
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
        // Now sign-in with userData
      }
    )
  }

  public socialSignOut(){
    this.socialAuthService.signOut().then( () => {
      this.user = null;
      localStorage.removeItem('user');
    })
  }

  public getToken(){
    return this.user.token;
  }

}
