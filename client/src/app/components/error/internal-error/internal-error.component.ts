import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-internal-error',
    standalone: true,
    imports: [],
    templateUrl: './internal-error.component.html',
    styleUrl: './internal-error.component.scss',
})
export class InternalErrorComponent {
    constructor(public router: Router) {}
}
