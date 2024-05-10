import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user.interface';

@Component({
    selector: 'top-panel',
    standalone: true,
    imports: [],
    templateUrl: './top-panel.component.html',
    styleUrl: './top-panel.component.scss',
})
export class TopPanelComponent implements OnInit {
    constructor(private userService: UserService) {}

    @Input() title!: string;
    user!: User;

    ngOnInit(): void {
        this.userService.get().subscribe({
            next: (data: User | any) => {
                this.user = data;
            },
        });
    }

    showMore = false
}
