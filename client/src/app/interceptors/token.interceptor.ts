import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const cookieService = inject(CookieService);

    if (cookieService.check('user')) {
        const token = cookieService.get('user');

        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    return next(req);
};
