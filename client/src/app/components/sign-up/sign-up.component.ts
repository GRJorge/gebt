import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';

@Component({
    selector: 'sign-up',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
    constructor(private userService: UserService){}

    step = 0;

    emailControl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.email]);

    formPassword = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirm: new FormControl('', [Validators.required]),
    });

    formName = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

    validForms() {
        switch (this.step) {
            case 0:
                if (this.emailControl.valid) {
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

                    const newUser: User = {
                        name: this.formName.get('name')!.value!,
                        lastname: this.formName.get('lastname')!.value!,
                        email: this.emailControl!.value!,
                        password: this.formPassword.get('confirm')!.value!,
                    };

                    this.userService.newUser(newUser).subscribe({
                        next: () => {
                            alert("Usuario guardado")
                        },error: () => {
                            alert("Error")
                        }
                    })
                }
                break;
        }
    }
    nextStep() {
        if (this.step < 2) {
            this.step += 1;
        }
    }
    previousStep() {
        if (this.step > 0) {
            this.step -= 1;
        }
    }
}
