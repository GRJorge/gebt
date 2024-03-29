import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { Patients } from '../../../interfaces/patient.interface';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponent } from '../../general/notification/notification.component';
import { NewAppointment } from '../../../interfaces/appointment.interface';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
    selector: 'new-appointment',
    standalone: true,
    imports: [PatientAppointmentComponent, NotificationComponent, ReactiveFormsModule],
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

    datetime = new FormControl('', Validators.required);

    idPatient?: string;
    namePatient: string = 'Selecciona un paciente';
    lastnamePatient: string = '';

    setPatient(data: string[]) {
        this.idPatient = data[0];
        this.namePatient = data[1];
        this.lastnamePatient = data[2];
    }

    submitForm(event: Event) {
        event.preventDefault();

        const newAppointment: NewAppointment = {
            datetime: new Date(this.datetime.value!),
            patient: this.idPatient ?? '',
        };

        this.appointmentService.new(newAppointment).subscribe();
    }
}
