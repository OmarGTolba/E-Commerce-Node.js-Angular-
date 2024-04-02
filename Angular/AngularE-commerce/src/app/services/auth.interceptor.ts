
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    if (token && !req.url.endsWith('/api/v1/user/login')) {
      const authReq = req.clone({
        headers: req.headers.set('jwt', token),
      });
      return next.handle(authReq);
    }


    return next.handle(req);
  }
}