export interface NewAppointment {
    date: Date;
    patient: string;
}
export interface Appointment {
    _id: string;
    date: Date;
    state: number;
    patient: {
        _id: string;
        name: string;
        lastname: string;
    };
    user: string;
    createdAt: Date;
}
