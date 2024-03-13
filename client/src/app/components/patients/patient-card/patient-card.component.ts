import { Component, Input } from '@angular/core';
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
    constructor(private patientService: PatientService) {}

    @Input() patient!: Patient;
    sureDelete = false;

    calculateAge(): string {
        const birthday = new Date(this.patient.birthday);
        const date = new Date();

        let age = date.getFullYear() - birthday.getFullYear();
        const month = date.getMonth() - birthday.getMonth();
        let text = 'años';

        if (month < 0 || (month === 0 && date.getDate() < birthday.getDate() + 1)) {
            age--;
        }
        if (age === 1) {
            text = 'año';
        }

        return `${age} ${text}`;
    }

    delete() {
        if (this.sureDelete) {
            this.patientService.delete(this.patient._id).subscribe();
        }
        this.sureDelete = true;
    }
}
