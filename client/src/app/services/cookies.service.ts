import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class CookiesService {
    constructor(private cookieService: CookieService) {}

    createSessionCookie(token: string) {
        let expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);

        this.cookieService.set('session', token, { expires: expirationDate, sameSite: 'Strict' });
    }
}
