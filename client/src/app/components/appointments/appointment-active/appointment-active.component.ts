import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponent } from '../../general/notification/notification.component';
import { Appointment } from '../../../interfaces/appointment.interface';
import { DatetimeService } from '../../../services/datetime.service';
import { AppointmentData, NewAppointmentData } from '../../../interfaces/appointmentData.interface';
import { AppointmentDataService } from '../../../services/appointment-data.service';

@Component({
    selector: 'appointment-active',
    standalone: true,
    imports: [NotificationComponent, ReactiveFormsModule],
    templateUrl: './appointment-active.component.html',
    styleUrl: './appointment-active.component.scss',
})
export class AppointmentActiveComponent {
    constructor(private appointmentDataService: AppointmentDataService, public datetimeService: DatetimeService) {}

    @Input() appointment!: Appointment;
    appointmentData?: AppointmentData;

    form = new FormGroup({
        weight: new FormControl('', [Validators.required, Validators.min(1), Validators.max(300)]),
        height: new FormControl('', [Validators.required, Validators.min(1), Validators.max(300)]),
        af: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    });

    getFormError(form: string, error: string): boolean {
        return this.form.get(form)!.getError(error);
    }

    hour(): string {
        const date = new Date(this.appointment.date);
        return this.datetimeService.to12(date.getHours(), date.getMinutes());
    }

    submitForm() {
        const newAppointmentData: NewAppointmentData = {
            appointment: this.appointment._id,
            weight: parseInt(this.form.get('weight')!.value!),
            height: parseInt(this.form.get('height')!.value!),
            af: parseInt(this.form.get('af')!.value!),
            patient: this.appointment.patient._id,
        };

        this.appointmentDataService.set(newAppointmentData).subscribe({
            next: (data: AppointmentData | any) => {
                this.appointmentData = data.data;
                console.log(this.appointmentData);
            },
        });
    }
}
