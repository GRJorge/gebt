import { Component, OnInit } from '@angular/core';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { TableComponent } from '../general/table/table.component';
import { PatientService } from '../../services/patient.service';
import { Patients } from '../../interfaces/patient.interface';

@Component({
    selector: 'patients',
    standalone: true,
    imports: [NewPatientComponent, TableComponent],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss',
})
export class PatientsComponent implements OnInit {
    constructor(private patientService: PatientService) {}
    
    patients!: Patients[];
    newForm = false;

    ngOnInit(): void {
        this.patientService.get('createdAt','desc').subscribe((data: any) => {
            this.patients = data;
            for(let patient of this.patients){
                if(patient.gender === "M"){
                    patient.gender = '♂'
                }else{
                    patient.gender = '♀'
                }
            }
        });
    }

    toggleNewForm() {
        this.newForm = !this.newForm;
    }
}
