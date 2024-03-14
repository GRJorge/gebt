import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { TopPanelComponent } from './top-panel/top-panel.component';
import { PatientsComponent } from '../patients/patients.component';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NavigationComponent, TopPanelComponent, PatientsComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    constructor(private userService: UserService) {}

    numSection = 0;
    titleTopPanel = ['Dashboard', 'Pacientes', 'Citas', 'Dietas'];

    ngOnInit(): void {
        this.userService.verifyToken();
    }

    //CAMBIO DE NUMSECTION
    changeSection(numSection: number) {
        this.numSection = numSection;
    }
}
