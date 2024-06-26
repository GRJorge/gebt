import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NewAppointmentData } from '../interfaces/appointmentData.interface';

@Injectable({
    providedIn: 'root',
})
export class AppointmentDataService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.apiUrl + 'appointmentData/';

    set(data: NewAppointmentData) {
        return this.http.post(this.apiUrl + 'set', data);
    }
    get(appointment: string) {
        return this.http.get(this.apiUrl + 'get', { params: { appointment } });
    }
    getByPatient(patient: string) {
        return this.http.get(this.apiUrl + 'getByPatient', { params: { patient } });
    }
}
