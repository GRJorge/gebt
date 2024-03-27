import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'patient-appointment',
    standalone: true,
    imports: [],
    templateUrl: './patient-appointment.component.html',
    styleUrl: './patient-appointment.component.scss',
})
export class PatientAppointmentComponent {
    @Input() name!: string;
    @Input() lastname!: string;
    @Input() gender!: string;
    @Input() id!: string;

    @Output() patientClickedEvent = new EventEmitter<string[]>();

    patientClicked() {
        this.patientClickedEvent.emit([this.id, this.name, this.lastname]);
    }
}
