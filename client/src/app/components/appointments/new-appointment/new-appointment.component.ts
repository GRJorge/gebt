import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { Patients } from '../../../interfaces/patient.interface';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';
import { NotificationComponent } from '../../general/notification/notification.component';
import { AppointmentService } from '../../../services/appointment.service';
import { DateFormComponent } from '../../general/date-form/date-form.component';

@Component({
    selector: 'new-appointment',
    standalone: true,
    imports: [PatientAppointmentComponent, NotificationComponent, DateFormComponent],
    templateUrl: './new-appointment.component.html',
    styleUrl: './new-appointment.component.scss',
})
export class NewAppointmentComponent implements OnInit {
    constructor(private patientService: PatientService, private appointmentService: AppointmentService) {}

    patients?: Patients[];

    ngOnInit(): void {
        this.patientService.get('createdAt', 'asc').subscribe({
            next: (result: Patients[] | any) => {
                this.patients = result;
            },
        });
    }

    idPatient?: string;
    namePatient: string = 'Selecciona un paciente';
    lastnamePatient: string = '';

    date!: Object;

    saveAppointment() {}

    setPatient(data: string[]) {
        this.idPatient = data[0];
        this.namePatient = data[1];
        this.lastnamePatient = data[2];
    }
    setDate(date: Object) {
        this.date = date;
    }
}
