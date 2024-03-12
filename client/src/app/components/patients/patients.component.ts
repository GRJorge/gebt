import { Component, OnInit } from '@angular/core';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { PatientCardComponent } from './patient-card/patient-card.component';
import { TableComponent } from '../general/table/table.component';
import { PatientService } from '../../services/patient.service';
import { Patients } from '../../interfaces/patient.interface';

@Component({
    selector: 'patients',
    standalone: true,
    imports: [NewPatientComponent, PatientCardComponent, TableComponent],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss',
})
export class PatientsComponent implements OnInit {
    constructor(private patientService: PatientService) {}
    patients?: Patients[];
    viewNewForm = false;

    ngOnInit(): void {
        this.patientService.get().subscribe({
            next: (data: Patients | any) => {
                this.patients = data;
            },
        });
    }

    toggleNewForm() {
        this.viewNewForm = !this.viewNewForm;
    }
}
