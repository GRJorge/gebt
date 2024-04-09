import { Component } from '@angular/core';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { AppointmentCardComponent } from './appointment-card/appointment-card.component';

@Component({
    selector: 'appointments',
    standalone: true,
    imports: [NewAppointmentComponent, AppointmentCardComponent],
    templateUrl: './appointments.component.html',
    styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent {
    newForm = false;
}
