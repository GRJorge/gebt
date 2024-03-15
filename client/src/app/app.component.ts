import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { ThemeService } from './services/theme.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    constructor(private userService: UserService, public themeService: ThemeService) {}

    ngOnInit(): void {
        this.userService.verifyToken();
    }
}
