import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from '../../../interfaces/appointment.interface';
import { DatetimeService } from '../../../services/datetime.service';
import { AppointmentService } from '../../../services/appointment.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'appointment-card',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './appointment-card.component.html',
    styleUrl: './appointment-card.component.scss',
})
export class AppointmentCardComponent implements OnInit {
    constructor(private appointmentService: AppointmentService, private datetimeService: DatetimeService) {}

    @Input() appointment!: Appointment;
    @Input() options = true;
    @Input() active = false;

    showReschedule = false;
    reschedule!: FormControl;

    ngOnInit(): void {
        const appointmentDate = new Date(this.appointment.date);
        this.reschedule = new FormControl(`${appointmentDate.getFullYear()}-${(appointmentDate.getMonth() + 1).toString().padStart(2, '0')}-${appointmentDate.getDate().toString().padStart(2, '0')}T${appointmentDate.getHours().toString().padStart(2, '0')}:${appointmentDate.getMinutes().toString().padStart(2, '0')}`, Validators.required);
    }
    //ESTADO DE LA CITA
    //0: Pendiente, 1: Activo, 2: Cancelado, 3: No asistido
    stateString(): string {
        switch (this.appointment.state) {
            case 0:
                return 'Pendiente';
            case 1:
                return 'Atendido';
            case 2:
                return 'Cancelado';
            default:
                return 'No asistido';
        }
    }
    //DIA DE LA CITA
    dayWeekString(): string {
        const date = new Date();
        const dateAppointment = new Date(this.appointment.date);
        const dayDifference = dateAppointment.getDate() - date.getDate();

        if (dayDifference >= -1) {
            switch (dayDifference) {
                case -1:
                    return 'Ayer';
                case 0:
                    return 'Hoy';
                case 1:
                    return 'Mañana';
                default:
                    return dayToString(dateAppointment.getDay());
            }
        } else {
            return this.datetimeService.dateToString(dateAppointment);
        }

        function dayToString(day: number) {
            const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

            return days[day];
        }
    }
    hourString(): string {
        const date = new Date(this.appointment.date);

        return this.datetimeService.to12(date.getHours(), date.getMinutes());
    }

    sureCancel = false;
    @Output() canceledEvent = new EventEmitter();

    cancelAppointment() {
        if (this.sureCancel) {
            this.appointmentService.cancel(this.appointment._id).subscribe({
                next: () => {
                    this.canceledEvent.emit();
                },
            });
        }
        this.sureCancel = true;
    }
}
