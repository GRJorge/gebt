import { Component, Input } from '@angular/core';

@Component({
    selector: 'notification',
    standalone: true,
    imports: [],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss',
})
export class NotificationComponent {
    @Input() color = "red";
    @Input() icon = "exclamation";
    @Input() text!: String;
}
