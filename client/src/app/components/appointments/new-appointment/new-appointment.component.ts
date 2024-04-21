import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../interfaces/patient.interface';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';
import { NotificationComponent } from '../../general/notification/notification.component';
import { AppointmentService } from '../../../services/appointment.service';
import { DateFormComponent } from '../../general/date-form/date-form.component';
import { Appointment, NewAppointment } from '../../../interfaces/appointment.interface';
import { DatetimeService } from '../../../services/datetime.service';

@Component({
    selector: 'new-appointment',
    standalone: true,
    imports: [PatientAppointmentComponent, NotificationComponent, DateFormComponent],
    templateUrl: './new-appointment.component.html',
    styleUrl: './new-appointment.component.scss',
})
export class NewAppointmentComponent implements OnInit {
    constructor(private patientService: PatientService, private appointmentService: AppointmentService, private datetimeService: DatetimeService) {}

    patients?: Patient[];

    ngOnInit(): void {
        this.patientService.get('createdAt', 'asc').subscribe({
            next: (result: Patient[] | any) => {
                this.patients = result;
            },
        });
    }

    idPatient?: string;
    namePatient: string = 'Selecciona un paciente';
    lastnamePatient: string = '';

    date!: Date;
    @Output() savedEvent = new EventEmitter();

    saveAppointment() {
        const newAppointment: NewAppointment = {
            date: this.date,
            patient: this.idPatient!,
        };

        this.appointmentService.new(newAppointment).subscribe({
            next: () => {
                this.savedEvent.emit();
            },
        });
    }

    setPatient(data: string[]) {
        this.idPatient = data[0];
        this.namePatient = data[1];
        this.lastnamePatient = data[2];
    }

    approximateAppointments?: Appointment[];
    equalAppointment = false;

    setDate(date: Date) {
        this.date = date;
        console.log(date);
        this.approximateAppointments = undefined;
        this.equalAppointment = false;

        this.appointmentService.overlap(date).subscribe({
            error: (error) => {
                if (error.status === 400) {
                    if (error.error.type === 'approximate') {
                        this.approximateAppointments = error.error.appointments;
                    } else {
                        this.equalAppointment = true;
                    }
                }
            },
        });
    }
    stringDate(date: Date): string {
        const datetime = new Date(date);
        return this.datetimeService.to12(datetime.getHours(), datetime.getMinutes());
    }
}
