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
