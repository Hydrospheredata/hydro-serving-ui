import { ColorMapService } from '@core/services/color-map.service';
import { ImageHelperService } from '@core/services/image-helper.service';

describe('ImageHelper', () => {
  const service = new ImageHelperService(new ColorMapService());
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('with 2x2 grayScale 0-1 array with alpha depended on value', () => {
    const pixels = [0.5, 1, 1, 1];
    const imageWidth = 2;
    const imageHeight = 2;
    it('should return 16 length array', () => {
      const expected = [0, 0, 0, 127.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const result = service.transformToRGBA({
        pixels,
        imageHeight,
        imageWidth,
      });
      expect(result.length).toBe(16);
      expect(result).toEqual(expected);
    });
  });
  describe('with 2x2 grayScale255 array', () => {
    const pixels = [112, 50, 112, 25];
    const imageWidth = 2;
    const imageHeight = 2;
    it('should return 16 length array with alpha 1', () => {
      const expected = [112, 112, 112, 255, 50, 50, 50, 255, 112, 112, 112, 255, 25, 25, 25, 255];
      const result = service.transformToRGBA({
        pixels,
        imageHeight,
        imageWidth,
      });
      expect(result.length).toBe(16);
      expect(result).toEqual(expected);
    });
  });
  describe('with 2x2 RGB array', () => {
    const pixels = [112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112];
    const imageWidth = 2;
    const imageHeight = 2;
    it('should return 16 length array with alpha 1', () => {
      const expected = [
        112,
        112,
        112,
        255,
        112,
        112,
        112,
        255,
        112,
        112,
        112,
        255,
        112,
        112,
        112,
        255,
      ];
      const result = service.transformToRGBA({
        pixels,
        imageHeight,
        imageWidth,
      });
      expect(result.length).toBe(16);
      expect(result).toEqual(expected);
    });
  });
});
