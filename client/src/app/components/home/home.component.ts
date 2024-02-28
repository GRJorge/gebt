import { Component } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { TopPanelComponent } from './top-panel/top-panel.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NavigationComponent, TopPanelComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {}
