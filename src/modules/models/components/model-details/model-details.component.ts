import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ZenModeService } from '@core/services/zenmode.service';
import { DialogService } from '@dialog/dialog.service';
import {
  DialogDeleteModelComponent,
  SELECTED_MODEL,
} from '@models/components/dialogs';
import { ModelsFacade } from '@models/store';
@Component({
  selector: 'hs-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelDetailsComponent {
  public model$ = this.modelsFacade.selectedModel$;
  public modelVersions$ = this.modelsFacade.selectedModelVersions$;
  public isZenMode$ = this.zenMode.isZenMode$;

  constructor(
    private modelsFacade: ModelsFacade,
    private dialog: DialogService,
    private zenMode: ZenModeService
  ) {}

  public removeModel(model) {
    this.dialog.createDialog({
      component: DialogDeleteModelComponent,
      providers: [{ provide: SELECTED_MODEL, useValue: model }],
    });
  }
}
