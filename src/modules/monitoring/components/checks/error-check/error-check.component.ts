import { Component, Input } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import {
  DialogRequestsErrorsComponent,
  REQUESTS_ERRORS,
} from '@monitoring/components/dialogs';
import { ScaleLinear } from 'd3';

@Component({
  selector: 'hs-error-check',
  templateUrl: 'error-check.component.html',
  styleUrls: ['error-check.component.scss'],
})
export class ErrorCheckComponent {
  readonly CELL_MARGINS: number = 4;
  readonly CHART_HEIGHT: number = 40;
  readonly CHART_MARGIN_LEFT: number = 40;
  readonly CHART_MARGIN_RIGHT: number = 6;
  readonly CHART_WIDTH: number = 300;
  readonly VIEW_WIDTH: number =
    this.CHART_WIDTH - this.CHART_MARGIN_LEFT - this.CHART_MARGIN_RIGHT;

  xScale: ScaleLinear<number, number>;
  xAxisScale: ScaleLinear<number, number>;

  @Input() data: Array<string | null> = [];

  get cellWidth(): number {
    if (this.data.length) {
      return this.VIEW_WIDTH / this.data.length - this.CELL_MARGINS;
    } else {
      return 0;
    }
  }

  constructor(private dialog: DialogService) {}

  openErrorsDialog(): void {
    this.dialog.createDialog({
      component: DialogRequestsErrorsComponent,
      styles: {
        width: '640px',
      },
      providers: [{ provide: REQUESTS_ERRORS, useValue: this.data }],
    });
  }

  get errorsCount(): number {
    if (this.data) {
      const withError = el => el !== null;
      return this.data.filter(withError).length;
    }

    return 0;
  }

  get showButton(): boolean {
    if (this.data) {
      return this.errorsCount > 1;
    }

    return false;
  }
}
