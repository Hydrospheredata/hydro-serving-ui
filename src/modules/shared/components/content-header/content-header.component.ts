import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hydro-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss']
})
export class ContentHeaderComponent implements OnInit {

    @Input() contentHeaderTitle: string;
    @Input() isActionsEnabled: boolean;

    constructor() { }

    ngOnInit() {
    }

}
