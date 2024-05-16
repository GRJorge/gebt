import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { NotificationComponent } from '../general/notification/notification.component';

@Component({
    selector: 'settings',
    standalone: true,
    imports: [NotificationComponent],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
    constructor(private userService: UserService) {}

    user!: User;

    ngOnInit(): void {
        this.userService.get().subscribe({
            next: (data: User | any) => {
                this.user = data;
            },
        });
    }
}
