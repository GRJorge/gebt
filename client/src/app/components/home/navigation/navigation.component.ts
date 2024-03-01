import { Component, EventEmitter, HostListener, Output } from '@angular/core';

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

    //CAMBIO DE SECCION Y ENVIO DE DATOS
    titleSection = 'Inicio';
    iconSection = 'house-blank';

    @Output() numSectionEvent = new EventEmitter<number>();

    changeSection(numSection: number, title: string, icon: string) {
        this.titleSection = title;
        this.iconSection = icon;
        this.numSectionEvent.emit(numSection);
    }

    //RESPONSIVE EN NAVIGATION
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
