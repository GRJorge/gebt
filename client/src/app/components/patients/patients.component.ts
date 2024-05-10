import { Component, OnInit } from '@angular/core';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { PatientCardComponent } from './patient-card/patient-card.component';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../interfaces/patient.interface';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';

@Component({
    selector: 'patients',
    standalone: true,
    imports: [NewPatientComponent, PatientCardComponent, PatientDetailComponent],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss',
})
export class PatientsComponent implements OnInit {
    constructor(private patientService: PatientService) {}
    patients: Patient[] = [];

    patientDetail?: string;

    viewNewForm = false;
    patientEdit?: Patient;
    modeEdit = false;

    ngOnInit(): void {
        this.updatePatient();
    }

    toggleNewForm() {
        if (this.patientDetail) {
            this.patientDetail = undefined
        } else {
            this.modeEdit = false;
            this.patientEdit = undefined;
            this.viewNewForm = !this.viewNewForm;
        }
    }

    updatePatient(sort: string = 'createdAt', order: string = 'desc') {
        this.patientService.get(sort, order).subscribe({
            next: (data: Patient[] | any) => {
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

    setPatientDetail(id: string) {
        this.viewNewForm = false;

        this.patientDetail = id;
    }
}
