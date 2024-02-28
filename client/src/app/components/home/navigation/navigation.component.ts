import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'navigation',
    standalone: true,
    imports: [],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
    hide = false;

    constructor() {
        this.updateViewportSize();
    }

    updateViewportSize() {
        if (window.innerWidth <= 900) {
            this.hide = true;
        } else {
            this.hide = false;
        }
    }

    changeHide() {
        if (this.hide) {
            this.hide = false;
        } else {
            this.hide = true;
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.updateViewportSize();
    }
}
