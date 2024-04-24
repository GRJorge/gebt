import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponent } from '../../general/notification/notification.component';

@Component({
    selector: 'appointment-active',
    standalone: true,
    imports: [NotificationComponent, ReactiveFormsModule],
    templateUrl: './appointment-active.component.html',
    styleUrl: './appointment-active.component.scss',
})
export class AppointmentActiveComponent {
    form = new FormGroup({
        weight: new FormControl('', [Validators.required, Validators.min(1), Validators.max(300)]),
        height: new FormControl('', [Validators.required, Validators.min(1), Validators.max(300)]),
        af: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    });

    getFormError(form: string, error: string): boolean {
        return this.form.get(form)!.getError(error);
    }
}
