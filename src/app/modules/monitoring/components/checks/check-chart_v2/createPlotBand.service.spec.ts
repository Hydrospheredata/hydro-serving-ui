// import { CreatePlotBand } from './createPlotBand.service';
//
// export interface ChartData {
//   data: Array<number>;
//   threshold: number;
// }
//
// const data: ChartData = {
//   data: [],
//   threshold: 6
// };
//
// describe('CreatePlotBand', () => {
//   const result = new CreatePlotBand();
//   describe('when data array is empty', () => {
//     it('should return an empty array', () => {
//       expect(result.create(data).length).toBe(0);
//     });
//   });
//   describe('when data array contains numbers', () => {
//     it('should return an array with objects', () => {
//       const dataWithValues: ChartData = {
//         data: [1, 2, 5, 25, 8, 3, 7, 10, 1],
//         threshold: 6
//       };
//       expect(result.create(dataWithValues)).toEqual([{from: 3, to: 4}, {from: 6, to: 7}]);
//     });
//   });
// });
