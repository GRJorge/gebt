import { Component, EventEmitter, Output } from '@angular/core';
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
    getControlValue(control: string): string {
        return this.newForm.get(control)!.value;
    }

    @Output() newPatientOk = new EventEmitter();

    //ENVIO DE NUEVO PACIENTE
    submitForm() {
        const newPatient: Patient = {
            name: this.getControlValue('name'),
            lastname: this.getControlValue('lastname'),
            phone: this.getControlValue('phone'),
            birthday: new Date(this.getControlValue('birthday')),
            gender: this.getControlValue('gender'),
        };

        this.patientService.newPatient(newPatient).subscribe({
            next: () => {
                this.newPatientOk.emit();
            },
        });
    }
}
