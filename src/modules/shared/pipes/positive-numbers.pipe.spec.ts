import { PositiveNumbersPipe } from './positive-numbers.pipe';

describe('PositiveNumbersPipe', () => {
    it('create an instance', () => {
        const pipe = new PositiveNumbersPipe();
        expect(pipe).toBeTruthy();
    });
});
