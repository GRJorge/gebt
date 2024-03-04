import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponent } from '../../general/notification/notification.component';

@Component({
    selector: 'new-patient',
    standalone: true,
    imports: [ReactiveFormsModule, NotificationComponent],
    templateUrl: './new-patient.component.html',
    styleUrl: './new-patient.component.scss',
})
export class NewPatientComponent {
    newForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.nullValidator]),
        lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
        phone: new FormControl('', Validators.minLength(10)),
        birthday: new FormControl('', Validators.required),
        gender: new FormControl('F', Validators.required),
    });

    getControlError(control: string, error: string) {
        return this.newForm.get(control)!.getError(error);
    }
}
