import { Component, Input } from '@angular/core';

@Component({
    selector: 'date-form',
    standalone: true,
    imports: [],
    templateUrl: './date-form.component.html',
    styleUrl: './date-form.component.scss',
})
export class DateFormComponent {
    @Input() hours = false
    datetime = new Date();

    months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    getRange(start: number, end: number): number[] {
        const length = end - start + 1;
        return Array.from({ length }, (_, index) => start + index);
    }
    getHour(): number {
        let hour = this.datetime.getUTCHours() + 6;

        return hour > 12 ? hour - 12 : hour;
    }
}
