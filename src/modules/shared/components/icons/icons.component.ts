import { Component, Input } from "@angular/core";

@Component({
    selector: 'hydro-icon',
    templateUrl: './icons.template.html',
    styleUrls: ['./icons.component.scss']
})

export class IconComponent {
    @Input() type: string;
    @Input() title: string;
    constructor() {}
}