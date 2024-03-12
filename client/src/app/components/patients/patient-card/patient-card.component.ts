import { Component, Input } from '@angular/core';
import { Patient } from '../../../interfaces/patient.interface';

@Component({
    selector: 'patient-card',
    standalone: true,
    imports: [],
    templateUrl: './patient-card.component.html',
    styleUrl: './patient-card.component.scss',
})
export class PatientCardComponent {
    @Input() patient!: Patient;

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
}
