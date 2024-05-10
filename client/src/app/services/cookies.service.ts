import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class CookiesService {
    expirationDate = new Date();

    constructor(private cookieService: CookieService, private router: Router) {
        this.expirationDate.setDate(this.expirationDate.getDate() + 30);
    }

    createSessionCookie(token: string) {
        this.cookieService.set('session', token, { expires: this.expirationDate, sameSite: 'Strict' });
    }

    themeCookie(theme: string) {
        this.cookieService.set('theme', theme, { expires: this.expirationDate });
    }
    getThemeCookie(): string {
        return this.cookieService.get('theme');
    }
    deleteSessionCookie() {
        this.cookieService.delete('session');
        this.router.navigate(['/signin']);
    }
}
