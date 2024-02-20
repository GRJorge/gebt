import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'sign-up',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
    step = 0;

    emailControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]);

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
                    alert('Enviar post');
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
