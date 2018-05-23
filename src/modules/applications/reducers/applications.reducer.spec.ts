import * as reducer from './applications.reducer';

describe('reducer', () => {
    describe('undefined action', () => {
        it('should return the default state', () => {
            const { initialState } = reducer;
            const state = reducer.reducer(undefined, {} as any);
            expect(state).toBe(initialState);
        });
    });

    // describe('Get applications with success', () => {
    //     it('should add all applications to state', () => {

    //     });
    // });
});
