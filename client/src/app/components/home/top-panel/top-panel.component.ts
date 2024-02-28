import { Component } from '@angular/core';
import { LogoComponent } from '../../general/logo/logo.component';

@Component({
    selector: 'top-panel',
    standalone: true,
    imports: [LogoComponent],
    templateUrl: './top-panel.component.html',
    styleUrl: './top-panel.component.scss',
})
export class TopPanelComponent {}
