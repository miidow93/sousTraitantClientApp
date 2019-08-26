import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (token) {
            req = req.clone({
                setHeaders: {
                    'Authorization': 'Bearer ' + token
                }
            });
        }

        if (!req.headers.has('Content-type')) {
            req = req.clone({
                setHeaders: {
                    'content-type': 'application/json'
                }
            });
        }

        req = req.clone({
            headers: req.headers.set('Accept', 'application/json')
        });

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event -----> ', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                if (error.status === 401) {
                    this.router.navigate(['login']);
                }
                if (error.status === 400) {
                    alert(error.error);
                }
                return throwError(error);
            })
        );
    }
}
