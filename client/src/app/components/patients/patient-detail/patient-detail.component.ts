import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../interfaces/patient.interface';
import { AppointmentService } from '../../../services/appointment.service';
import { Appointment } from '../../../interfaces/appointment.interface';
import { AppointmentCardComponent } from '../../appointments/appointment-card/appointment-card.component';

@Component({
    selector: 'patient-detail',
    standalone: true,
    imports: [AppointmentCardComponent],
    templateUrl: './patient-detail.component.html',
    styleUrl: './patient-detail.component.scss',
})
export class PatientDetailComponent implements OnInit {
    constructor(public patientService: PatientService, private appointmentService: AppointmentService) {}

    @Input() id!: string;
    patient!: Patient;
    appointments!: Appointment[];

    ngOnInit(): void {
        this.patientService.getById(this.id).subscribe({
            next: (data: Patient | any) => {
                this.patient = data;
            },
        });

        this.appointmentService.getByPatient(this.id).subscribe({
            next: (data: Appointment[] | any) => {
                this.appointments = data;
            },
        });
    }
}
