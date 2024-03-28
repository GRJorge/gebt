import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PatientService } from '../../../../services/patient.service';

@Component({
    selector: 'patient-appointment',
    standalone: true,
    imports: [],
    templateUrl: './patient-appointment.component.html',
    styleUrl: './patient-appointment.component.scss',
})
export class PatientAppointmentComponent {
    constructor(public patientService: PatientService) {}

    @Input() name!: string;
    @Input() lastname!: string;
    @Input() gender!: string;
    @Input() birthday!: Date;
    @Input() id!: string;

    @Output() patientClickedEvent = new EventEmitter<string[]>();

    patientClicked() {
        this.patientClickedEvent.emit([this.id, this.name, this.lastname]);
    }
}
