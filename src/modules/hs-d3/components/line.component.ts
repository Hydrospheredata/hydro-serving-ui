import { Component, Input } from '@angular/core';
import { Line } from '../model';

@Component({
    selector: '[hs-line]',
    template: `
    <svg:line
        [attr.x1]="x1"
        [attr.y1]="y1"
        [attr.x2]="x2"
        [attr.y2]="y2"
        [stroke]="s"
    ></svg:line>`,
})
export class LineComponent {
    @Input('hs-line') line: Line;

    get x1(): number {
        return this.line.x1;
    }
    get x2(): number {
        return this.line.x2;
    }
    get y1(): number {
        return this.line.y1;
    }
    get y2(): number {
        return this.line.y2;
    }
    get s() {
        return 'red';
    }
}
