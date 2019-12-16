import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ImageHelperService } from '@core/services/image-helper.service';

@Component({
  selector: 'hs-tensor-image-list',
  templateUrl: './tensor-image-list.component.html',
  styleUrls: ['./tensor-image-list.component.scss'],
})
export class TensorImageListComponent implements OnInit, OnChanges {
  @Input() pixels;
  @Input() tensorProto;
  imagesCount: number;
  imageWidth: number;
  imageHeight: number;
  imagePixelsArray: number[][];

  readonly elementsForRGBA = 4;
  constructor(private imageHelper: ImageHelperService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pixels || changes.tensorProto) {
      this.redraw();
    }
  }
  private redraw() {
    let dim;
    try {
      dim = this.tensorProto.dim;
      const [imagesCount, imageWidth, imageHeight] = dim;
      this.imagesCount = imagesCount.size;
      this.imageWidth = imageWidth.size;
      this.imageHeight = imageHeight.size;

      const pixels = this.pixels;
      let arrayOfRGBAPixels;

      try {
        arrayOfRGBAPixels = this.imageHelper.transformToRGBA({
          pixels,
          imageWidth: this.imageWidth,
          imageHeight: this.imageHeight,
          batchSize: this.imagesCount,
        });
        try {
          const RGBAPixels =
            this.imageWidth * this.imageHeight * this.elementsForRGBA;
          this.imagePixelsArray = this.partitionArrayBySize(
            arrayOfRGBAPixels,
            RGBAPixels
          );
        } catch (error) {
          throw Error('Cant split data');
        }
      } catch (err) {
        console.dir(err);
      }
    } catch (error) {
      throw Error('Did not found dim property in tensorShape');
    }
  }

  private partitionArrayBySize(arr, size): number[][] {
    let offset = 0;
    const arrLength = arr.length;
    const res = [];

    while (offset < arrLength) {
      res.push(arr.slice(offset, offset + size));
      offset += size;
    }

    return res;
  }
}
