import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { NotificationComponent } from '../general/notification/notification.component';
import { LoadingComponent } from '../general/loading/loading.component';
import { Router } from '@angular/router';
import { CookiesService } from '../../services/cookies.service';
import { CookieService } from 'ngx-cookie-service';
import { LogoComponent } from '../general/logo/logo.component';

@Component({
    selector: 'sign-up',
    standalone: true,
    imports: [ReactiveFormsModule, NotificationComponent, LoadingComponent, LogoComponent],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
    constructor(private userService: UserService, private router: Router, private cookies: CookiesService, private cookieService: CookieService) {}

    step = 0;
    errorDuplicatedEmail = false;

    emailControl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.email]);

    formPassword = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirm: new FormControl('', [Validators.required]),
    });

    formName = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
    //OBTENCION DE ERRORES EN CONTROLES ESPECIFICOS DE FORMULARIOS
    getFormErrors(form: FormGroup, control: string, error: string): boolean {
        return form.get(control)?.getError(error);
    }
    //FUNCION QUE VALIDA SI TODOS LOS FORMULARIOS SON CORRECTOS
    validForms() {
        switch (this.step) {
            case 0:
                if (this.emailControl.valid) {
                    this.errorDuplicatedEmail = false;
                    this.nextStep();
                }
                break;
            case 1:
                if (this.formPassword.valid) {
                    this.nextStep();
                }
                break;
            default:
                if (this.formName.valid) {
                    this.nextStep();

                    setTimeout(() => {
                        //CREAR NUEVO OBJETO DE USUARIO
                        const newUser: User = {
                            name: this.formName.get('name')!.value!,
                            lastname: this.formName.get('lastname')!.value!,
                            email: this.emailControl!.value!,
                            password: this.formPassword.get('confirm')!.value!,
                        };
                        //ENVIAR NUEVO USUARIO AL API
                        this.userService.newUser(newUser).subscribe({
                            next: (result: any) => {
                                this.cookies.createSessionCookie(result.token);
                                this.nextStep();
                                setTimeout(() => {
                                    this.router.navigate(['/']);
                                }, 1000);
                            },
                            error: (error) => {
                                if (error.status === 400) {
                                    //ERROR DE CORREO DUPLICADO
                                    if (error.error.valueWithError === 'email') {
                                        this.errorDuplicatedEmail = true;
                                        this.step = 0;
                                    }
                                }
                            },
                        });
                    }, 1000);
                }
                break;
        }
    }
    nextStep() {
        if (this.step < 4) {
            this.step += 1;
        }
    }
    previousStep() {
        if (this.step > 0) {
            this.step -= 1;
        }
    }
    redirectSignIn() {
        this.router.navigate(['/signin']);
    }

    redirectHome() {
        this.router.navigate(['/']);
    }

    hiddenHomeCookie(): boolean {
        return this.cookieService.check('session');
    }
}
