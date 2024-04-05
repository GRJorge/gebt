export interface NewAppointment {
    date: {
        day: number;
        month: number;
        year: number;
        hour: number;
        minute: number;
    };
    patient: string;
}
export interface DateObject {
    day: number;
    month: number;
    year: number;
    hour: number;
    minute: number;
    time: string;
}
export interface ApproximateAppointment {
    _id: string;
    date: DateObject;
    state: number;
    patient: {
        _id: string;
        name: string;
        lastname: string;
    };
    user: string;
    createdAt: Date;
}
export interface Appointment {
    _id: string;
    date: DateObject;
    state: number;
    patient: string;
    user: string;
    createdAt: Date;
}
