import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from '../../../interfaces/appointment.interface';
import { DatetimeService } from '../../../services/datetime.service';
import { AppointmentService } from '../../../services/appointment.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponent } from '../../general/notification/notification.component';
import { AppointmentData } from '../../../interfaces/appointmentData.interface';
import { AppointmentDataService } from '../../../services/appointment-data.service';

@Component({
    selector: 'appointment-card',
    standalone: true,
    imports: [ReactiveFormsModule, NotificationComponent],
    templateUrl: './appointment-card.component.html',
    styleUrl: './appointment-card.component.scss',
})
export class AppointmentCardComponent implements OnInit {
    constructor(private appointmentService: AppointmentService, private appointmentDataService: AppointmentDataService, private datetimeService: DatetimeService) {}

    @Input() appointment!: Appointment;
    @Input() options = true;
    @Input() active = false;

    showReschedule = false;
    reschedule!: FormControl;
    appointmentData?: AppointmentData;

    ngOnInit(): void {
        const appointmentDate = new Date(this.appointment.date);
        this.reschedule = new FormControl(`${appointmentDate.getFullYear()}-${(appointmentDate.getMonth() + 1).toString().padStart(2, '0')}-${appointmentDate.getDate().toString().padStart(2, '0')}T${appointmentDate.getHours().toString().padStart(2, '0')}:${appointmentDate.getMinutes().toString().padStart(2, '0')}`, Validators.required);

        if (this.appointment.state === 1) {
            this.appointmentDataService.get(this.appointment._id).subscribe({
                next: (data: AppointmentData | any) => {
                    this.appointmentData = data;
                },
            });
        }
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

        if (dayDifference >= -1 && dateAppointment.getMonth() === date.getMonth() && dateAppointment.getFullYear() === date.getFullYear()) {
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
    hourString(datetime: Date): string {
        const date = new Date(datetime);

        return this.datetimeService.to12(date.getHours(), date.getMinutes());
    }

    sureCancel = false;
    @Output() updateEvent = new EventEmitter();

    cancelAppointment() {
        if (this.sureCancel) {
            this.appointmentService.cancel(this.appointment._id).subscribe({
                next: () => {
                    this.updateEvent.emit();
                },
            });
        }
        this.sureCancel = true;
    }

    approximateAppointments?: Appointment[];
    equalAppointment = false;

    rescheduleAppointmentOverlap() {
        this.approximateAppointments = undefined;
        this.equalAppointment = false;

        this.appointmentService.overlap(new Date(this.reschedule.value)).subscribe({
            error: (error) => {
                if (error.error.type === 'approximate') {
                    this.approximateAppointments = error.error.appointments;
                } else {
                    this.equalAppointment = true;
                }
            },
        });
    }
    rescheduleAppointment(event: Event) {
        event.preventDefault();

        this.appointmentService.reschedule(this.appointment._id, new Date(this.reschedule.value)).subscribe({
            next: () => {
                this.showReschedule = false;
                this.updateEvent.emit();
            },
        });
    }
}
