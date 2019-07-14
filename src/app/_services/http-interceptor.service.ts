import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(sessionStorage.getItem('token')) 
    {
      let tokenString = 'Bearer '+ sessionStorage.getItem('token')
      req = req.clone({
        setHeaders:
        {
          'Authorization': tokenString
        }
      })
    }
    else {
      console.warn('No JWT token found')
    }
    return next.handle(req);
  }

  constructor() { }
}