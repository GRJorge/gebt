import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DatetimeService {
    to24(hour: number, time: string): number {
        if (time === 'am') {
            return hour === 12 ? 0 : hour;
        } else {
            return hour === 12 ? hour : hour + 12;
        }
    }
    to12(hour: number, minute: number): string {
        const ampm = hour < 12 ? 'am' : 'pm';

        if (hour < 12) {
            return `${hour === 0 ? 12 : this.twoDigits(hour)}:${this.twoDigits(minute)} ${ampm}`;
        } else {
            return `${this.twoDigits(hour === 12 ? hour : hour - 12)}:${this.twoDigits(minute)} ${ampm}`;
        }
    }
    dateToString(date: Date): string {
        return `${this.twoDigits(date.getDate())}/${this.twoDigits(date.getMonth())}/${date.getFullYear()}`;
    }

    twoDigits(number: number): string {
        return number.toString().padStart(2, '0');
    }
}
