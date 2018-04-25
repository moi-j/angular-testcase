import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
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
    console.log(authReq, req);
    // send cloned request with header to the next handler.
    return next.handle(authReq)
      .pipe(tap((event: HttpEvent<any>) => {
          if (event){
            console.log('Token interceptor event', event);
          };
      }, err => {
        if (err instanceof HttpErrorResponse) {
          console.log('token interceptor error', err);
        }
      }));
  }
}
