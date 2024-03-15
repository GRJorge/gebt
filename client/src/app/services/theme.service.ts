import { Injectable, signal } from '@angular/core';
import { CookiesService } from './cookies.service';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    constructor(private cookiesService: CookiesService) {}

    theme = signal<string>(this.cookiesService.getThemeCookie() === '' ? 'lightTheme' : this.cookiesService.getThemeCookie());

    updateTheme() {
        this.theme.update((value) => (value === 'darkTheme' ? 'lightTheme' : 'darkTheme'));
        this.cookiesService.themeCookie(this.theme());
        console.log(this.cookiesService.getThemeCookie())
    }
}
