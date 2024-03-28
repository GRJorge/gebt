import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from '../../../interfaces/patient.interface';
import { PatientService } from '../../../services/patient.service';

@Component({
    selector: 'patient-card',
    standalone: true,
    imports: [],
    templateUrl: './patient-card.component.html',
    styleUrl: './patient-card.component.scss',
})
export class PatientCardComponent {
    constructor(public patientService: PatientService) {}

    @Input() patient!: Patient;

    @Output() update = new EventEmitter();
    @Output() edit = new EventEmitter<Patient>();
    sureDelete = false;

    editEvent() {
        this.edit.emit(this.patient);
    }

    delete() {
        if (this.sureDelete) {
            this.patientService.delete(this.patient._id).subscribe({
                next: () => {
                    this.update.emit();
                },
            });
        }
        this.sureDelete = true;
    }
}
