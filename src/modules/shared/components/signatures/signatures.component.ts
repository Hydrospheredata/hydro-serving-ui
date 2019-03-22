
import { Component, Input } from '@angular/core';
import {
    ISignature
} from '@shared/models/_index';

@Component({
    selector: 'hydro-signatures',
    templateUrl: './signatures.component.html',
    styleUrls: ['./signatures.component.scss'],
})
export class SignaturesComponent {
    @Input() modelId: number;
    @Input() signature: ISignature;
}
