import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateObject } from '../../../interfaces/appointment.interface';

@Component({
    selector: 'date-form',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './date-form.component.html',
    styleUrl: './date-form.component.scss',
})
export class DateFormComponent {
    @Input() hours = false;
    @Input() now = false;

    @Output() sendDateEvent = new EventEmitter<DateObject>();

    datetime = new Date();
    months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    date: DateObject = {
        day: this.datetime.getDate(),
        month: this.datetime.getMonth(),
        year: this.datetime.getFullYear(),
        hour: this.getHour(),
        minute: 0,
        time: this.getTime(),
    };

    getRange(start: number, end: number): number[] {
        const length = end - start + 1;
        return Array.from({ length }, (_, index) => start + index);
    }
    getHour(): number {
        let hour = this.datetime.getUTCHours() + 6;

        return hour > 12 ? hour - 12 : hour;
    }
    getTime(): string {
        return this.datetime.getHours() > 12 ? 'pm' : 'am';
    }

    sendDate() {
        this.sendDateEvent.emit(this.date);
    }
}
