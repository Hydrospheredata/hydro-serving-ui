import { neitherNullNorUndefined } from './neither-null-nor-undefined';
import { cold } from 'jasmine-marbles';

xdescribe('neitherNullNorUndefined', () => {
  it("doesn't emit parent's null of undefined values", () => {
    const values = { x: 1, y: null, z: 2, i: undefined };
    const outerStream = cold('xyzi|', values).pipe(neitherNullNorUndefined);
    const expectedStream = cold('x-z-|', values);

    expect(outerStream).toBeObservable(expectedStream);
  });
});
