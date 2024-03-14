import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponent } from '../../general/notification/notification.component';
import { PatientService } from '../../../services/patient.service';
import { NewPatient, Patient } from '../../../interfaces/patient.interface';

@Component({
    selector: 'new-patient',
    standalone: true,
    imports: [ReactiveFormsModule, NotificationComponent],
    templateUrl: './new-patient.component.html',
    styleUrl: './new-patient.component.scss',
})
export class NewPatientComponent implements OnInit, OnChanges {
    constructor(private patientService: PatientService) {}

    @Input() modeEdit = false;
    @Input() patientEdit?: Patient;
    form!: FormGroup;

    @Output() update = new EventEmitter();

    ngOnInit(): void {
        this.initForm();
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.initForm();
    }

    initForm() {
        let dateFormat = '';
        if (this.patientEdit?.birthday) {
            let date = new Date(this.patientEdit.birthday);
            dateFormat = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + (date.getDate() + 1)).slice(-2)}`;
        }

        this.form = new FormGroup({
            name: new FormControl(this.patientEdit?.name, [Validators.required, Validators.minLength(3)]),
            lastname: new FormControl(this.patientEdit?.lastname, [Validators.required, Validators.minLength(3)]),
            phone: new FormControl(this.patientEdit?.phone, Validators.pattern('^[0-9]{10}$')),
            birthday: new FormControl(dateFormat, Validators.required),
            gender: new FormControl(this.patientEdit?.gender ?? 'F', Validators.required),
        });
    }

    getControlError(control: string, error: string): boolean {
        return this.form.get(control)!.getError(error);
    }
    getControlValue(control: string): string {
        return this.form.get(control)?.value;
    }

    submitForm() {
        const newPatient: NewPatient = {
            name: this.getControlValue('name'),
            lastname: this.getControlValue('lastname'),
            phone: this.getControlValue('phone'),
            birthday: new Date(this.getControlValue('birthday')),
            gender: this.getControlValue('gender'),
        };

        if (!this.modeEdit) {
            this.patientService.newPatient(newPatient).subscribe({
                next: () => {
                    this.update.emit();
                },
            });
        } else {
            console.log('edit');
        }
    }
}
