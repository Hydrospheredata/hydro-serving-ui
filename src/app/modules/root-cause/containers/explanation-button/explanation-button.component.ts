import { Component, InjectionToken, Input } from '@angular/core';
import { ModelVersionId } from '@app/core/data/types';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import { ExplanationDialogComponent } from '@app/modules/dialogs/components';

export const MODEL_VERSION_ID = new InjectionToken<ModelVersionId>(
  'selected model id',
);
export const OUTPUT_FIELD = new InjectionToken<string>('output field');
export const REQUEST_ID = new InjectionToken<string>('request id');
export const METHOD = new InjectionToken<string>('method');

@Component({
  selector: 'hs-exp-button',
  templateUrl: './explanation-button.component.html',
  styleUrls: ['./explanation-button.component.scss'],
})
export class ExplanationButtonComponent {
  @Input() modelVersionId: ModelVersionId;
  @Input() requestId: string;
  @Input() outputField: string;

  constructor(private dialogService: DialogsService) {}

  explain() {
    this.dialogService.createDialog({
      component: ExplanationDialogComponent,
      providers: [
        {
          provide: MODEL_VERSION_ID,
          useValue: this.modelVersionId,
        },
        {
          provide: REQUEST_ID,
          useValue: this.requestId,
        },
        {
          provide: METHOD,
          useValue: 'anchor',
        },
        {
          provide: OUTPUT_FIELD,
          useValue: this.outputField,
        },
      ],
    });
  }
}
