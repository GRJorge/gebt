import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-unknow-error',
    standalone: true,
    imports: [],
    templateUrl: './unknow-error.component.html',
    styleUrl: './unknow-error.component.scss',
})
export class UnknowErrorComponent {
    constructor(public router: Router){}
}
