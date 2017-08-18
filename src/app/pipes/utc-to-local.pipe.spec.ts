import { UtcToLocalPipe } from './utc-to-local.pipe';

describe('UtcToLocalPipe', () => {
  it('create an instance', () => {
    const pipe = new UtcToLocalPipe();
    expect(pipe).toBeTruthy();
  });
});
