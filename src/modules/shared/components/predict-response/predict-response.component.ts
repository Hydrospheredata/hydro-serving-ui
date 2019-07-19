import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PredictResponse } from '@shared/components/metrics/req';
import { ModelVersion } from '@shared/models/_index';
import { getFiledNameByTensorDataType } from '@shared/utils/field-name-by-tensor-data-type';
import { fromSnakeToCamel } from '@shared/utils/from-snake-to-camel';
@Component({
  selector: 'hs-predict-response',
  templateUrl: './predict-response.component.html',
  styleUrls: ['./predict-response.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PredictResponseComponent implements OnInit {
  @Input()
  response: PredictResponse;

  @Input()
  modelVersion: ModelVersion;

  ngOnInit(): void {}

  isImage(inputName: string): boolean {
    const isImage = this.modelVersion.modelContract.predict.inputs.some(
      p => p.name === inputName && p.profile === 'IMAGE'
    );
    return isImage;
  }

  getValue(tensorProto): any {
    const field = fromSnakeToCamel(
      getFiledNameByTensorDataType(tensorProto.dtype)
    );
    const data = tensorProto[field];
    try {
      return data.join(', ');
    } catch {
      return data;
    }
  }
}
