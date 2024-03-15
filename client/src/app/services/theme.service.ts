import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    theme = signal<string>('darkTheme');

    updateTheme() {
        this.theme.update((value) => (value === 'darkTheme' ? 'lightTheme' : 'darkTheme'));
    }
}
