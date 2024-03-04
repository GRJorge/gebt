import { Component } from '@angular/core';
import { NewPatientComponent } from './new-patient/new-patient.component';

@Component({
    selector: 'patients',
    standalone: true,
    imports: [NewPatientComponent],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss',
})
export class PatientsComponent {
    newForm = false;

    toggleNewForm() {
        if (this.newForm) {
            this.newForm = false;
        } else {
            this.newForm = true;
        }
    }
}
