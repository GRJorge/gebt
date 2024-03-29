import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationComponent } from '../general/notification/notification.component';
import { UserService } from '../../services/user.service';
import { UserSignIn } from '../../interfaces/user.interface';
import { LoadingComponent } from '../general/loading/loading.component';
import { CookiesService } from '../../services/cookies.service';
import { CookieService } from 'ngx-cookie-service';
import { LogoComponent } from '../general/logo/logo.component';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [ReactiveFormsModule, NotificationComponent, LoadingComponent, LogoComponent],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
    constructor(private userService: UserService, private router: Router, private cookies: CookiesService, private cookieService: CookieService) {}

    valid = false;
    unregisteredUserError = false;
    incorrectPasswordError = false;

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

    redirectHome() {
        this.router.navigate(['/']);
    }

    hiddenHomeCookie(): boolean {
        return this.cookieService.check('session');
    }

    signIn() {
        if (this.form.valid) {
            this.valid = true;

            setTimeout(() => {
                const user: UserSignIn = {
                    email: this.form.get('email')!.value!,
                    password: this.form.get('password')!.value!,
                };

                this.userService.signin(user).subscribe({
                    next: (result: any) => {
                        this.cookies.createSessionCookie(result.token);
                        this.router.navigate(['/']);
                    },
                    error: (error) => {
                        this.unregisteredUserError = false;
                        this.incorrectPasswordError = false;

                        if (error.status === 400) {
                            if (error.error.valueWithError === 'password') {
                                this.incorrectPasswordError = true;
                            } else if (error.error.valueWithError === 'email') {
                                this.unregisteredUserError = true;
                            }
                        }
                        this.valid = false;
                    },
                });
            }, 1000);
        }
    }
}
