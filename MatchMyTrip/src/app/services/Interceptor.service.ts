import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

constructor() { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let tokenizedReq = req.clone({
    setHeaders: {
      Authorization: 'bearer '+ sessionStorage.getItem("jwt")
    }
  })
  return next.handle(tokenizedReq);
}
}
