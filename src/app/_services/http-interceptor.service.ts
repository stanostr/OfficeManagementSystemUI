import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(sessionStorage.getItem('token') && req.url.startsWith('http://localhost:8081')) 
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
      console.warn('Request sent without JWT token')
    }
    return next.handle(req);
  }

  constructor() { }
}