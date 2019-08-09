import { Injectable } from '@angular/core';
import {
  ColorMapService,
  ColorMapType,
} from '@core/services/color-map.service';
import * as d3 from 'd3';

interface ImageData {
  pixels: number[];
  imageWidth: number;
  imageHeight: number;
  batchSize?: number;
  colormap?: ColorMapType;
}

enum ImageType {
  greyScaleAlpha = 'grey scale alpha channel',
  greyScale255 = 'grey scale 0-255',
  rgb = 'rbg',
}

type grayScaleType = ImageType.greyScaleAlpha | ImageType.greyScale255;

@Injectable({
  providedIn: 'root',
})
export class ImageHelperService {
  constructor(private colorMap: ColorMapService) {}
  transformToRGBA(imageData: ImageData): number[] {
    try {
      switch (this.recognizeImageType(imageData)) {
        case ImageType.greyScaleAlpha:
          return this.grayScaleAlphaToRGBA(imageData.pixels, imageData.colormap);
        case ImageType.greyScale255:
          return this.grayScale255ToRGBA(imageData.pixels, imageData.colormap);
        case ImageType.rgb:
          return this.RGBtoRGBA(imageData.pixels);
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  private recognizeImageType(imageData: ImageData): ImageType {
    const { pixels, imageHeight, imageWidth, batchSize } = imageData;
    const dim =
      pixels.length /
      (imageWidth * imageHeight) /
      (batchSize > 1 ? batchSize : 1);
    switch (dim) {
      case 1:
        return this.specifyGrayScale(pixels);
      case 3:
        return ImageType.rgb;
      default:
        console.error({ pixels, imageHeight, imageWidth });
        throw Error('Cant recognize image type');
    }
  }

  private specifyGrayScale(pixels: number[]): grayScaleType {
    return pixels.some(val => val > 0 && val < 1)
      ? ImageType.greyScaleAlpha
      : ImageType.greyScale255;
  }

  private grayScaleAlphaToRGBA(
    pixels: number[],
    colormapType: ColorMapType
  ): number[] {
    let rgb;
    if (colormapType) {
      rgb = pixels.reduce((acc, cur) => {
        const offset = acc.length;
        const [r, g, b] = this.colorMap.getRGB({
          val: cur,
          type: colormapType,
        });
        acc[offset] = r;
        acc[offset + 1] = g;
        acc[offset + 2] = b;
        acc[offset + 3] = 255;
        return acc;
      }, []);
    } else {
      rgb = pixels.reduce((acc, cur) => {
        const offset = acc.length;
        acc[offset] = 0;
        acc[offset + 1] = 0;
        acc[offset + 2] = 0;
        acc[offset + 3] = 255 * (1 - cur);

        return acc;
      }, []);
    }
    return rgb;
  }

  private RGBtoRGBA(pixels: number[]): number[] {
    const arr = [];

    for (let i = 0, l = pixels.length; i < l; i += 3) {
      const x = arr.length;
      arr[x] = pixels[i];
      arr[x + 1] = pixels[i + 1];
      arr[x + 2] = pixels[i + 2];
      arr[x + 3] = 255;
    }
    return arr;
  }

  private grayScale255ToRGBA(
    pixels: number[],
    colormapType: ColorMapType
  ): number[] {
    let result: number[];
    if (colormapType) {
      const depthScale = d3
        .scaleLinear()
        .domain([0, 255])
        .clamp(true);

      result = pixels.reduce((acc, cur) => {
        const offset = acc.length;
        const [r, g, b] = this.colorMap.getRGB({
          val: depthScale(cur),
          type: colormapType,
        });
        acc[offset] = r;
        acc[offset + 1] = g;
        acc[offset + 2] = b;
        acc[offset + 3] = 255;

        return acc;
      }, []);
    } else {
      result = pixels.reduce((acc, cur) => {
        const offset = acc.length;
        acc[offset] = cur;
        acc[offset + 1] = cur;
        acc[offset + 2] = cur;
        acc[offset + 3] = 255;

        return acc;
      }, []);
    }
    return result;
  }
}
