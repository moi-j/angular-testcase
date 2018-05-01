import { Injectable } from '@angular/core';
import { apiUrl } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

import {User} from "../interfaces/user";

@Injectable()
export class UserService {

  public users: User[];

  constructor(
    private http: HttpClient
  ) {
  }

  public getUsers() {
    return this.http.get<User[]>( apiUrl );
  }

  public getUser( user: User ) {
    return this.http.get<User>( `${apiUrl}/${user.id}` );
  }

  public createUser( user: User) {
    return this.http.post<User>( apiUrl, user );
  }

  public updateUser ( user: User) {
    return this.http.patch( `${apiUrl}/${user.id}`, user );
  }

  public deleteUser ( user: User ) {
    return this.http.delete( `${apiUrl}/${user.id}` );
  }

}
