import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NewPatient, Patient } from '../interfaces/patient.interface';

@Injectable({
    providedIn: 'root',
})
export class PatientService {
    constructor(private http: HttpClient) {}

    private url = `${environment.apiUrl}patient/`;

    newPatient(patient: NewPatient) {
        return this.http.post(this.url + 'new', patient);
    }
    get(sort: string = 'createdAt', order: string = 'asc') {
        return this.http.get(this.url + 'get', { params: { sort, order } });
    }
    edit(patient: Patient) {
        return this.http.patch(this.url + 'edit', patient);
    }
    delete(id: string) {
        return this.http.delete(this.url + 'delete', { body: { id } });
    }
    getAge(birthday: Date): string{
        const birthdayDate = new Date(birthday);
        const date = new Date();

        let age = date.getFullYear() - birthdayDate.getFullYear();
        const month = date.getMonth() - birthdayDate.getMonth();
        let text = 'años';

        if (month < 0 || (month === 0 && date.getDate() < birthdayDate.getDate() + 1)) {
            age--;
        }
        if (age === 1) {
            text = 'año';
        }

        return `${age} ${text}`;
    }
}
