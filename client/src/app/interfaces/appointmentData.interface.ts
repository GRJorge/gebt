export interface NewAppointmentData {
    appointment: string;
    weight: number;
    height: number;
    af: number;
    patient: string;
}
export interface AppointmentData {
    _id: string;
    height: number;
    weight: number;
    af: number;
    imc: number;
    gebData: number;
    getData: number;
    appointment: string;
    createdAt: Date;
    updatedAt: Date;
}
