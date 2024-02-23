import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationComponent } from '../general/notification/notification.component';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [ReactiveFormsModule, NotificationComponent],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
    constructor(private router: Router) {}

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    getControlError(control: string, error: string): boolean {
        return this.form.get(control)?.getError(error);
    }

    redirectSignUp() {
        this.router.navigate(['/signup']);
    }
}
