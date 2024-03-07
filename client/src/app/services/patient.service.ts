import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Patient } from '../interfaces/patient.interface';

@Injectable({
    providedIn: 'root',
})
export class PatientService {
    constructor(private http: HttpClient) {}

    private url = `${environment.apiUrl}patient/`;

    newPatient(patient: Patient) {
        return this.http.post(this.url + 'new', patient);
    }
    get(sort: string = 'createdAt', order: string = 'asc') {
        return this.http.get(this.url + 'get', { params: { sort, order } });
    }
    delete(id: string) {
        return this.http.delete(this.url + 'delete', { body: { id } });
    }
}
