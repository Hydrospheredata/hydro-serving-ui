import { Component, Input } from '@angular/core';
import { Model } from '@shared/models/_index';

@Component({
    selector: 'hydro-list-info',
    templateUrl: './list-info.component.html',
    styleUrls: ['./list-info.component.scss'],
})
export class ListInfoComponent {
    @Input() data: Model;
}
