import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../interfaces/patient.interface';
import { AppointmentService } from '../../../services/appointment.service';
import { Appointment } from '../../../interfaces/appointment.interface';
import { AppointmentCardComponent } from '../../appointments/appointment-card/appointment-card.component';
import { ChartConfiguration, ChartEvent, ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'patient-detail',
    standalone: true,
    imports: [AppointmentCardComponent, BaseChartDirective],
    templateUrl: './patient-detail.component.html',
    styleUrl: './patient-detail.component.scss',
})
export class PatientDetailComponent implements OnInit {
    constructor(public patientService: PatientService, private appointmentService: AppointmentService) {}

    @Input() id!: string;
    patient!: Patient;
    appointments!: Appointment[];

    ngOnInit(): void {
        this.patientService.getById(this.id).subscribe({
            next: (data: Patient | any) => {
                this.patient = data;
            },
        });

        this.appointmentService.getByPatient(this.id).subscribe({
            next: (data: Appointment[] | any) => {
                this.appointments = data;
            },
        });
    }

    lineChartData: ChartConfiguration<'line'>['data'] = {
        labels: ['23/04/2024', '30/04/2024', '10/05/2024'],
        datasets: [
            {
                data: [2, 4, 5],
                label: 'Peso',
                tension: 0.1,
            },
        ],
    };
    lineChartOptions: ChartOptions<'line'> = {
        responsive: true,
        borderColor: '#CC9CD9',
    }
}
