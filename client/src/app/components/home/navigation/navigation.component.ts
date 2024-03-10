import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { LogoComponent } from '../../general/logo/logo.component';

@Component({
    selector: 'navigation',
    standalone: true,
    imports: [LogoComponent],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
    //hide = false;

    constructor() {
        //this.updateViewportSize();
    }

    //CAMBIO DE SECCION Y ENVIO DE DATOS
    @Output() numSectionEvent = new EventEmitter<number>();
    numSection = 0;

    changeSection(numSection: number) {
        this.numSection = numSection;
        this.numSectionEvent.emit(numSection);
    }

    //RESPONSIVE EN NAVIGATION
    /*updateViewportSize() {
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
    }*/
}
