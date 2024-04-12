import { Component, OnInit } from '@angular/core';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { AppointmentCardComponent } from './appointment-card/appointment-card.component';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../interfaces/appointment.interface';

@Component({
    selector: 'appointments',
    standalone: true,
    imports: [NewAppointmentComponent, AppointmentCardComponent],
    templateUrl: './appointments.component.html',
    styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent implements OnInit {
    constructor(private appointmentService: AppointmentService) {}

    newForm = false;
    pendingAppointments: Appointment[] = [];

    ngOnInit(): void {
        this.appointmentService.get().subscribe({
            next: (data: Appointment[] | any) => {
                this.pendingAppointments = data;
            },
        });
    }
}
