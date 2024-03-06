import { Component, Input } from '@angular/core';

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
        return obj[key];
    }
}
