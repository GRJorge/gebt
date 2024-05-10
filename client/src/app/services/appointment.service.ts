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
    get(state: number[] = [1, 2, 3]) {
        return this.http.get(this.url + 'get', { params: { state } });
    }
    getByPatient(patient: string) {
        return this.http.get(this.url + 'getByPatient', { params: { patient } });
    }
    upcoming() {
        return this.http.get(this.url + 'upcoming');
    }
    active() {
        return this.http.get(this.url + 'active');
    }
    cancel(appointment: string) {
        return this.http.patch(this.url + 'cancel', { appointment });
    }
    reschedule(appointment: string, date: Date) {
        return this.http.patch(this.url + 'reschedule', { appointment, date });
    }
    notAssisted() {
        return this.http.post(this.url + 'notAssisted', {});
    }
}
