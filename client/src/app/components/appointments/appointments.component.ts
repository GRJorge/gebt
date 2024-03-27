import { Component } from '@angular/core';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';

@Component({
    selector: 'appointments',
    standalone: true,
    imports: [NewAppointmentComponent],
    templateUrl: './appointments.component.html',
    styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent {}
