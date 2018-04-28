import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

import {AdminService} from "../services/admin.service";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _admin: AdminService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // Get the auth token from the service.
    const authToken = this._admin.getToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      setHeaders: { Authorization: 'Token ' + authToken }
    });

    // send cloned request with header to the next handler.
    console.log(authReq);
    return next.handle(authReq);

                                // CATCHING ERROR IN SUBSCRIBE INSTEAD
      // .pipe(tap((event: HttpEvent<any>) => {
      //     if (event){
      //       console.log('Token interceptor event', event);
      //     };
      // }, err => {
      //   if (err instanceof HttpErrorResponse) {
      //     console.log('token interceptor error', err);
      //   }
      // }));
  }
}
