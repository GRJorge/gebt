export interface NewAppointment {
    date: {
        day: { type: Number, required: true },
        month: { type: Number, required: true },
        year: { type: Number, required: true },
        hour: { type: Number, required: true },
        minute: { type: Number, required: true },
    },
    patient: string;
}
