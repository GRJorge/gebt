import { Component, Input } from '@angular/core';

@Component({
    selector: 'top-panel',
    standalone: true,
    imports: [],
    templateUrl: './top-panel.component.html',
    styleUrl: './top-panel.component.scss',
})
export class TopPanelComponent {
    @Input() title!: string;
}
