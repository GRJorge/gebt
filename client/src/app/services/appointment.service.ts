import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NewAppointment } from '../interfaces/appointment.interface';

@Injectable({
    providedIn: 'root',
})
export class AppointmentService {
    constructor(private http: HttpClient) {}

    private url = `${environment.apiUrl}appointment/`;

    new(appointment: NewAppointment) {
        return this.http.post(this.url + 'new', appointment);
    }
    overlap(date: Date) {
        return this.http.post(this.url + 'overlap', { date });
    }
    get(state: number = 0) {
        return this.http.get(this.url + 'get', { params: { state } });
    }
}
