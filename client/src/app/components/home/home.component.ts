import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { TopPanelComponent } from './top-panel/top-panel.component';
import { PatientsComponent } from '../patients/patients.component';
import { AppointmentsComponent } from '../appointments/appointments.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NavigationComponent, TopPanelComponent, PatientsComponent, AppointmentsComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    numSection = 2;
    titleTopPanel = ['Dashboard', 'Pacientes', 'Citas', 'Dietas'];

    //CAMBIO DE NUMSECTION
    changeSection(numSection: number) {
        this.numSection = numSection;
    }
}
