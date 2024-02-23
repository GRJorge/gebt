import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { NotificationComponent } from '../general/notification/notification.component';
import { LoadingComponent } from '../general/loading/loading.component';

@Component({
    selector: 'sign-up',
    standalone: true,
    imports: [ReactiveFormsModule, NotificationComponent, LoadingComponent],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
    constructor(private userService: UserService) {}

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

    getFormErrors(form: FormGroup, control: string, error: string): boolean {
        return form.get(control)?.getError(error);
    }

    validForms() {
        switch (this.step) {
            case 0:
                if (this.emailControl.valid) {
                    this.errorDuplicatedEmail = false
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
                        const newUser: User = {
                            name: this.formName.get('name')!.value!,
                            lastname: this.formName.get('lastname')!.value!,
                            email: this.emailControl!.value!,
                            password: this.formPassword.get('confirm')!.value!,
                        };

                        this.userService.newUser(newUser).subscribe({
                            next: () => {
                                alert('Usuario creado')
                            },
                            error: (error) => {
                                if(error.status === 400){
                                    if(error.error.valueWithError === 'email'){
                                        this.errorDuplicatedEmail = true;
                                        this.step = 0;
                                    }
                                }
                            }
                        })
                    }, 1000);
                }
                break;
        }
    }
    nextStep() {
        if (this.step < 3) {
            this.step += 1;
        }
    }
    previousStep() {
        if (this.step > 0) {
            this.step -= 1;
        }
    }
}
