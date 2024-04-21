import { Component, OnInit } from '@angular/core';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { AppointmentCardComponent } from './appointment-card/appointment-card.component';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../interfaces/appointment.interface';
import { DatetimeService } from '../../services/datetime.service';

@Component({
    selector: 'appointments',
    standalone: true,
    imports: [NewAppointmentComponent, AppointmentCardComponent],
    templateUrl: './appointments.component.html',
    styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent implements OnInit {
    constructor(private appointmentService: AppointmentService, private datetimeService: DatetimeService) {}

    newForm = false;
    upcomingAppointments: Appointment[] = [];
    activeAppointments: Appointment[] = [];
    recentAppointments: Appointment[] = [];
    appointments: Appointment[] = [];

    ngOnInit(): void {
        this.updateSection();
    }

    datetimeString(date: Date): string {
        const datetime = new Date(date);

        return this.datetimeService.to12(datetime.getHours(), datetime.getMinutes());
    }

    updateSection() {
        this.newForm = false;

        this.appointmentService.upcoming().subscribe({
            next: (data: Appointment[] | any) => {
                this.upcomingAppointments = data;
            },
        });

        this.appointmentService.active().subscribe({
            next: (data: Appointment[] | any) => {
                this.activeAppointments = data;
            },
        });

        this.appointmentService.get().subscribe({
            next: (data: Appointment[] | any) => {
                this.appointments = data;
                this.recentAppointments = this.appointments.splice(0, 4);
            },
        });
    }
}
