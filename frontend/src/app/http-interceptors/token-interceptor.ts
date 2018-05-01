import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse,
} from '@angular/common/http';

import {AdminService} from "../services/admin.service";
import {pipe} from "rxjs/Rx";
import {tap} from "rxjs/operators";
import {MatSnackBar, MatSnackBarRef} from "@angular/material";
import {Router} from "@angular/router";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private snackbarRef;

  constructor(
    private _admin: AdminService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // Get the auth token from the service.
    const authToken = this._admin.getToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      setHeaders: { Authorization: 'Token ' + authToken }
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq)
     .pipe(tap((event: HttpEvent<any>) => {}, err => {
        if (err instanceof HttpErrorResponse) {
          this.errorHandler(err);
        }
      }));
  }

  errorHandler(error){
    switch (error.status) {
      case 401:
        this.snackBar.open(
          'Your session has expired. Please, login again to continue',
          'Ok').afterDismissed().subscribe(()=>{
            this._admin.socialSignOut();
            this.router.navigate(['/login']);
        });
        break;
    }
  }

}
