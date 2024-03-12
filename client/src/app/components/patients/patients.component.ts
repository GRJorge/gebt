import { Component } from '@angular/core';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { PatientCardComponent } from './patient-card/patient-card.component';
import { TableComponent } from '../general/table/table.component';

@Component({
    selector: 'patients',
    standalone: true,
    imports: [NewPatientComponent, PatientCardComponent, TableComponent],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss',
})
export class PatientsComponent {
    viewNewForm = false;

    toggleNewForm() {
        this.viewNewForm = !this.viewNewForm;
    }
}
