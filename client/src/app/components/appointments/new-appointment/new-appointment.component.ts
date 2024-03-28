import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { Patients } from '../../../interfaces/patient.interface';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponent } from '../../general/notification/notification.component';

@Component({
    selector: 'new-appointment',
    standalone: true,
    imports: [PatientAppointmentComponent, NotificationComponent, ReactiveFormsModule],
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

    appointmentForm = new FormGroup({
        date: new FormControl('', Validators.required),
        datetime: new FormControl('', Validators.required),
    });

    idPatient?: string;
    namePatient: string = 'Selecciona un paciente';
    lastnamePatient: string = '';

    setPatient(data: string[]) {
        this.idPatient = data[0];
        this.namePatient = data[1];
        this.lastnamePatient = data[2];
    }
}
