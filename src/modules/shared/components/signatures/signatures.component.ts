
import { Component, Input } from '@angular/core';
import {
    Signature,
    ModelVersion
} from '@shared/models/_index';

@Component({
    selector: 'hydro-signatures',
    templateUrl: './signatures.component.html',
    styleUrls: ['./signatures.component.scss'],
})
export class SignaturesComponent {
    @Input() modelId: number;
    @Input() signatures: Signature[];
}
