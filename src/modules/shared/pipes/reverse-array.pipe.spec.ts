import { ReverseArrayPipe } from './reverse-array.pipe'

describe('Reverse pipe', () => {
    let reversePipe;
    beforeAll(() => {
        reversePipe = new ReverseArrayPipe()
    })

    it('is created', () => {
        expect(reversePipe).toBeTruthy();
    })

    it('return reversed array', () => {
        const array = [1, 2];
        expect(reversePipe.transform(array)).toEqual([2, 1])
    })
})