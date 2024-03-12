import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponent } from '../../general/notification/notification.component';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../interfaces/patient.interface';

@Component({
    selector: 'new-patient',
    standalone: true,
    imports: [ReactiveFormsModule, NotificationComponent],
    templateUrl: './new-patient.component.html',
    styleUrl: './new-patient.component.scss',
})
export class NewPatientComponent {
    constructor(private patientService: PatientService) {}

    form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
        phone: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
        birthday: new FormControl('', Validators.required),
        gender: new FormControl('F', Validators.required),
    });

    getControlError(control: string, error: string): boolean {
        return this.form.get(control)!.getError(error);
    }
    getControlValue(control: string): string {
        return this.form.get(control)?.value;
    }

    submitForm() {
        const newPatient: Patient = {
            name: this.getControlValue('name'),
            lastname: this.getControlValue('lastname'),
            phone: this.getControlValue('phone'),
            birthday: new Date(this.getControlValue('birthday')),
            gender: this.getControlValue('gender'),
        };

        this.patientService.newPatient(newPatient).subscribe();
    }
}
