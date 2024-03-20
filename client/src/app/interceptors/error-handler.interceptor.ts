import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 0) {
                router.navigate(['/unknow']);
            } else if (error.status === 500) {
                console.log('Internal error');
            } else if (error.status === 403) {
                router.navigate(['/signin']);
            }

            return throwError(() => error);
        })
    );
};
