import { Injectable } from '@angular/core';
import {apiUrl} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

import {User} from "../interfaces/user";
import {users} from "../interfaces/users.mok";

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public getUsers() {
    // let user = {
    //   first_name: 'Name',
    //   last_name: 'lastName',
    //   iban: 'DE12323123123'
    // }
    // return this.http.post( apiUrl, user );
    return this.http.get( apiUrl );
    // return users;
  }

  public getUser( user: User ) {
    return this.http.get( `${apiUrl}/${user.id}` );
  }

  public createUser( user: User) {
    return this.http.post( apiUrl, user );
  }

  public updateUser ( user: User) {
    return this.http.patch( `${apiUrl}/${user.id}`, user );
  }

  public deleteUser ( user: User ) {
    return this.http.delete( `${apiUrl}/${user.id}` );
  }
}
