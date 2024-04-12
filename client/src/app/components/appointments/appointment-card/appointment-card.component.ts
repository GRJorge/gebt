import { Component, Input } from '@angular/core';
import { Appointment } from '../../../interfaces/appointment.interface';

@Component({
    selector: 'appointment-card',
    standalone: true,
    imports: [],
    templateUrl: './appointment-card.component.html',
    styleUrl: './appointment-card.component.scss',
})
export class AppointmentCardComponent {
    @Input() appointment!: Appointment;

    //ESTADO DE LA CITA
    //0: Pendiente, 1: Activo, 2: Cancelado, 3: No asistido
    stateString(): string {
        switch (this.appointment.state) {
            case 0:
                return 'Pendiente';
            case 1:
                return 'Activo';
            case 2:
                return 'Cancelado';
            default:
                return 'No asistido';
        }
    }
    //DIA DE LA CITA
    dayWeekString(): string {
        const date = new Date();
        const dateAppointment = new Date(`${this.appointment.date.year}-${this.appointment.date.month + 1}-${this.appointment.date.day}`);

        switch (dateAppointment.getDate() - date.getDate()) {
            case 0:
                return 'Hoy';
            case 1:
                return 'Mañana';
            default:
                return dayToString(dateAppointment.getDay());
        }

        function dayToString(day: number) {
            const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

            return days[day];
        }
    }
}
