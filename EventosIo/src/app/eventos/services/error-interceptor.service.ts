import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // very similar to the concept of middle-ware
    // Nao estou manipulando nada do request , so os erros do response
    return next.handle(req).pipe(

      catchError((err: any) => {

        if (err instanceof HttpErrorResponse) {
          if (err && err.status === 401) {
            localStorage.removeItem('eio.token');
            localStorage.removeItem('eio.user');
            this.router.navigate(['/entrar']);
          }
          if (err && err.status === 403) {
            this.router.navigate(['/acesso-negado']);
          }
          if (err && err.status === 404) {
            this.router.navigate(['/nao-encontrado']);
          }
        }

        return throwError(err);
      })
    );

  }


}
