import { Component, OnInit } from '@angular/core';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { PatientCardComponent } from './patient-card/patient-card.component';
import { TableComponent } from '../general/table/table.component';
import { PatientService } from '../../services/patient.service';
import { Patient, Patients } from '../../interfaces/patient.interface';

@Component({
    selector: 'patients',
    standalone: true,
    imports: [NewPatientComponent, PatientCardComponent, TableComponent],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss',
})
export class PatientsComponent implements OnInit {
    constructor(private patientService: PatientService) {}
    patients: Patients[] = [];

    viewNewForm = false;
    patientEdit?: Patient;
    modeEdit = false;

    ngOnInit(): void {
        this.updatePatient();
    }

    toggleNewForm() {
        this.modeEdit = false;
        this.patientEdit = undefined;
        this.viewNewForm = !this.viewNewForm;
    }

    updatePatient(sort: string = 'createdAt', order: string = 'desc') {
        this.patientService.get(sort, order).subscribe({
            next: (data: Patients | any) => {
                this.patients = data;
                this.viewNewForm = false;
            },
        });
    }

    editPatient(patient: Patient) {
        this.modeEdit = true;
        this.patientEdit = patient;
        this.viewNewForm = true;
        console.log(this.patientEdit);
    }
}
