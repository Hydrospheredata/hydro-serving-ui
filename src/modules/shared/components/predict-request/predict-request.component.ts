import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { PredictRequest } from '@shared/components/metrics/req';
import { ModelVersion } from '@shared/models/_index';
import { getFiledNameByTensorDataType } from '@shared/utils/field-name-by-tensor-data-type';
import { fromSnakeToCamel } from '@shared/utils/from-snake-to-camel';

@Component({
    selector: 'hs-predict-request',
    templateUrl: './predict-request.component.html',
    styleUrls: ['./predict-request.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PredictRequestComponent implements OnInit {
    @Input()
    request: PredictRequest;

    @Input()
    modelVersion: ModelVersion;

    ngOnInit(): void {
    }

    isImage(inputName: string): boolean {
        const isImage = this.modelVersion
            .modelContract
            .predict
            .inputs.some(p => p.name === inputName && p.profile === 'IMAGE');
        return isImage;
    }

    getValue(tensorProto): any {
        const field = fromSnakeToCamel(getFiledNameByTensorDataType(tensorProto.dtype));
        const data = tensorProto[field];
        return data;
    }
}
