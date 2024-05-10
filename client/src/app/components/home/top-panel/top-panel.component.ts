import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user.interface';
import { CookiesService } from '../../../services/cookies.service';

@Component({
    selector: 'top-panel',
    standalone: true,
    imports: [],
    templateUrl: './top-panel.component.html',
    styleUrl: './top-panel.component.scss',
})
export class TopPanelComponent implements OnInit {
    constructor(private userService: UserService, private cookiesService: CookiesService) {}

    @Input() title!: string;
    user!: User;

    ngOnInit(): void {
        this.userService.get().subscribe({
            next: (data: User | any) => {
                this.user = data;
            },
        });
    }

    showMore = false;

    signOut() {
        this.cookiesService.deleteSessionCookie();
    }
}
