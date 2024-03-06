import { Component, OnInit } from '@angular/core';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { TableComponent } from '../general/table/table.component';
import { PatientService } from '../../services/patient.service';
import { Patients } from '../../interfaces/patient.interface';

@Component({
    selector: 'patients',
    standalone: true,
    imports: [NewPatientComponent, TableComponent],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss',
})
export class PatientsComponent implements OnInit {
    patients!: Patients[];
    newForm = false;

    constructor(private patientService: PatientService) {}

    ngOnInit(): void {
        this.patientService.get().subscribe((data: any) => {
            this.patients = data;
        });
    }

    toggleNewForm() {
        this.newForm = !this.newForm;
    }
}
