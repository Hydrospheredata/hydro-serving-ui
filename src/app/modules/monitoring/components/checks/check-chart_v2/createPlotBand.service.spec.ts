import { CreatePlotBand, PlotBandData } from './createPlotBand.service';

const data: PlotBandData = {
  threshold: 6,
  data: [],
};

describe('CreatePlotBand', () => {
  const result = new CreatePlotBand();
  describe('when data array is empty', () => {
    it('should return an empty array', () => {
      expect(result.create(data).length).toBe(0);
    });
  });
  describe('when data array contains numbers', () => {
    it('should return an array with objects', () => {
      const dataWithValues: PlotBandData = {
        threshold: 6,
        data: [1, 2, 5, 25, 8, 3, 7, 10, 1],
      };
      expect(result.create(dataWithValues)).toEqual([
        { from: 3, to: 4 },
        { from: 6, to: 7 },
      ]);
    });
  });
});
