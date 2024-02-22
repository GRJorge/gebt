import { Component, Input } from '@angular/core';

@Component({
    selector: 'loading',
    standalone: true,
    imports: [],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.scss',
})
export class LoadingComponent {
    @Input() text?: string;
}
