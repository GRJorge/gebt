import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { Patients } from '../../../interfaces/patient.interface';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';

@Component({
    selector: 'new-appointment',
    standalone: true,
    imports: [PatientAppointmentComponent],
    templateUrl: './new-appointment.component.html',
    styleUrl: './new-appointment.component.scss',
})
export class NewAppointmentComponent implements OnInit {
    constructor(private patientService: PatientService) {}

    patients?: Patients[];

    ngOnInit(): void {
        this.patientService.get('createdAt', 'asc').subscribe({
            next: (result: Patients[] | any) => {
                this.patients = result;
            },
        });
    }
}
