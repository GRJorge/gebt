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
    exchange: Appointment[] = [];

    ngOnInit(): void {
        this.appointmentService.get().subscribe({
            next: (data: Appointment[] | any) => {
                this.pendingAppointments = data;
                this.cutPending();
            },
        });
    }

    cutPending(iteration: number = 0, max: number = 5) {
        let step = false;
        const dateAppointment = new Date(this.pendingAppointments[iteration].date);
        const date = new Date();

        if (dateAppointment > date) {
            this.exchange.push(this.pendingAppointments[iteration]);
        } else {
            step = true;
            this.pendingAppointments = this.exchange;
            this.exchange = [];
        }

        if (iteration <= max && !step) {
            this.cutPending(iteration + 1);
        }
    }
}
