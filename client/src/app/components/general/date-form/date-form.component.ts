import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateObject } from '../../../interfaces/appointment.interface';

@Component({
    selector: 'date-form',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './date-form.component.html',
    styleUrl: './date-form.component.scss',
})
export class DateFormComponent implements OnInit {
    @Input() hours = false;
    @Input() now = false;

    @Output() sendDateEvent = new EventEmitter<DateObject>();

    ngOnInit(): void {
        this.sendDate();
    }

    datetime = new Date();
    weekday!: string;
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
        this.setWeekday();
    }
    setWeekday() {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        const date = new Date(`${this.date.year}-${parseInt(this.date.month.toString()) + 1}-${this.date.day}`);
        this.weekday = days[date.getDay()];
    }
}
