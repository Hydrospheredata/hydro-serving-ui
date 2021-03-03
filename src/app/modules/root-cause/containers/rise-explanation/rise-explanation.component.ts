import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { ImageHelperService } from '@app/core/image-helper.service';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import * as colorScale from 'd3-scale-chromatic';
import { ModelVersion } from '@app/core/data/types';
import { getFiledNameByTensorDataType } from '@app/utils/field-name-by-tensor-data-type';
import { fromSnakeToCamel } from '@app/utils/from-snake-to-camel';
import {
  RiseExplanation,
  RiseExplanationResult,
  ReqstoreEntry,
} from '../../models';

@Component({
  selector: 'hs-rise-explanation',
  templateUrl: './rise-explanation.component.html',
  styleUrls: ['./rise-explanation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiseExplanationComponent implements OnInit {
  imageWidth: number;
  imageHeight: number;
  originalImage: number[];

  showMore$: BehaviorSubject<any> = new BehaviorSubject('');
  showedExplanations$: Observable<
    RiseExplanationResult[]
  > = this.showMore$.pipe(
    scan(showed => {
      const STEP = 5;
      const accLength = showed.length;
      const res = [
        ...showed,
        ...this.explanations.slice(accLength, accLength + STEP),
      ];
      return res;
    }, [])
  );

  explanations;
  @Input() reqstoreEntry: ReqstoreEntry;
  @Input() modelVersion: ModelVersion;
  @Input() set explanation(explanation: RiseExplanation) {
    this.explanations = explanation.result
      .map(item => ({
        ...item,
        color: colorScale.interpolateBlues(
          item.probability < 0.5 ? 0.5 : item.probability
        ),
      }))
      .sort((a, b) => b.probability - a.probability);
  }

  constructor(
    private imageHelper: ImageHelperService,
    private dialog: DialogsService
  ) {}

  ngOnInit() {
    this.setWidthHeightForImages();
  }

  showMore() {
    this.showMore$.next('');
  }

  setWidthHeightForImages(): void {
    try {
      const imageField = this.modelVersion.contractInputs.find(
        p => p.profile === 'IMAGE'
      );
      const tensorProto = this.reqstoreEntry.request.inputs[imageField.name];
      const pixels = this.getValue(tensorProto);

      const dim = tensorProto.tensorShape.dim;
      const [, imageWidth, imageHeight] = dim;
      this.imageWidth = imageWidth.size;
      this.imageHeight = imageHeight.size;

      this.originalImage = this.imageHelper.transformToRGBA({
        pixels,
        imageHeight: this.imageWidth,
        imageWidth: this.imageHeight,
      });
    } catch {
      console.warn(`input doesn't have any IMAGE`);
    }
  }

  getPixels(arr: any): number[] {
    return this.imageHelper.transformToRGBA({
      pixels: arr,
      imageHeight: this.imageHeight,
      imageWidth: this.imageWidth,
      colormap: 'interpolateRdYlBu',
    });
  }

  isImage(inputName: string): boolean {
    const isImage = this.modelVersion.contractInputs.some(
      p => p.name === inputName && p.profile === 'IMAGE'
    );
    return isImage;
  }

  getValueAsText(tensorProto): any {
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

  showAsList(name: string) {
    if (name === 'probabilities') {
      return true;
    }
    return false;
  }

  onClose(): void {
    this.dialog.closeDialog();
  }

  private getValue(tensorProto): any {
    const field = fromSnakeToCamel(
      getFiledNameByTensorDataType(tensorProto.dtype)
    );
    const data = tensorProto[field];
    return data;
  }
}
