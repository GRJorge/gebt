import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
})
export class TableComponent {
    @Input() head!: string[];
    @Input() body!: object[];

    getObjectKeys(obj: object): string[] {
        return Object.keys(obj);
    }
    getKeysValue(obj: any, key: string): string {
        const value = obj[key];

        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) {
            const date = new Date(value);
            return `${date.getDate() + 1 < 10 ? '0' : ''}${date.getDate() + 1}/${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}/${date.getFullYear()}`;
        } else {
            return value;
        }
    }

    @Output() deleteEvent = new EventEmitter<string>();
    sureDelete = false;

    delete(id: string) {
        if (this.sureDelete) {
            this.deleteEvent.emit(id);
            this.sureDelete = false;
        } else {
            this.sureDelete = true;
        }
    }

    @Output() editEvent = new EventEmitter<object>();

    edit(data: object) {
        this.editEvent.emit(data);
    }
}
