import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../interfaces/patient.interface';
import { AppointmentService } from '../../../services/appointment.service';
import { Appointment } from '../../../interfaces/appointment.interface';
import { AppointmentCardComponent } from '../../appointments/appointment-card/appointment-card.component';
import { ChartConfiguration, ChartEvent, ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AppointmentDataService } from '../../../services/appointment-data.service';
import { AppointmentData } from '../../../interfaces/appointmentData.interface';
import { LoadingComponent } from '../../general/loading/loading.component';
import { DatetimeService } from '../../../services/datetime.service';

@Component({
    selector: 'patient-detail',
    standalone: true,
    imports: [AppointmentCardComponent, BaseChartDirective, LoadingComponent],
    templateUrl: './patient-detail.component.html',
    styleUrl: './patient-detail.component.scss',
})
export class PatientDetailComponent implements OnInit {
    constructor(public patientService: PatientService, private appointmentService: AppointmentService, private appointmentDataService: AppointmentDataService, private datetimeService: DatetimeService) {}

    @Input() id!: string;
    patient!: Patient;
    appointments!: Appointment[];
    weightChartData: number[] = [];
    imcChartData: number[] = [];
    labelsChart: string[] = [];

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

        this.appointmentDataService.getByPatient(this.id).subscribe({
            next: (data: AppointmentData[] | any) => {
                for (const appointmentData of data) {
                    this.weightChartData.push(appointmentData.weight);
                    this.imcChartData.push(appointmentData.imc);
                    this.labelsChart.push(this.datetimeService.dateToString(new Date(appointmentData.createdAt)));
                }
            },
        });
    }

    weightLineChartData: ChartConfiguration<'line'>['data'] = {
        labels: this.labelsChart,
        datasets: [
            {
                data: this.weightChartData,
                label: 'Peso',
            },
        ],
    };

    imcLineChartData: ChartConfiguration<'line'>['data'] = {
        labels: this.labelsChart,
        datasets: [
            {
                data: this.imcChartData,
                label: 'Peso',
            },
        ],
    };

    lineChartOptions: ChartOptions<'line'> = {
        responsive: true,
        borderColor: '#CC9CD9',
    };
}
