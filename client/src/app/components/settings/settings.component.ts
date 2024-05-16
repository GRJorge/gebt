import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { NotificationComponent } from '../general/notification/notification.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'settings',
    standalone: true,
    imports: [NotificationComponent, ReactiveFormsModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
    constructor(private userService: UserService) {}

    user!: User;
    nameForm!: FormGroup;
    passwordForm = new FormGroup({
        actualPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirm: new FormControl('', Validators.required),
    });

    editNameShowForm = false;
    editPasswordShowForm = false;

    ngOnInit(): void {
        this.userService.get().subscribe({
            next: (data: User | any) => {
                this.user = data;

                this.nameForm = new FormGroup({
                    name: new FormControl(this.user?.name, [Validators.required, Validators.minLength(3)]),
                    lastname: new FormControl(this.user?.lastname, [Validators.required, Validators.minLength(3)]),
                });
            },
        });
    }

    getFormControlError(form: FormGroup, control: string, error: string): boolean {
        return form.get(control)!.getError(error);
    }
    confirmPassword(): boolean {
        return this.passwordForm.get('newPassword')!.value === this.passwordForm.get('confirm')!.value;
    }
}
