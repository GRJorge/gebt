import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../interfaces/patient.interface';

@Component({
    selector: 'patient-detail',
    standalone: true,
    imports: [],
    templateUrl: './patient-detail.component.html',
    styleUrl: './patient-detail.component.scss',
})
export class PatientDetailComponent implements OnInit {
    constructor(public patientService: PatientService) {}

    @Input() id!: string;
    patient!: Patient;

    ngOnInit(): void {
        this.patientService.getById(this.id).subscribe({
            next: (data: Patient | any) => {
                this.patient = data;
            },
        });
    }
}
