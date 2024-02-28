import { Component, Input } from '@angular/core';

@Component({
    selector: 'logo',
    standalone: true,
    imports: [],
    templateUrl: './logo.component.html',
    styleUrl: './logo.component.scss',
})
export class LogoComponent {
    @Input() variant = "isotype"
    @Input() color = "dark"
    @Input() size = "64"
}
