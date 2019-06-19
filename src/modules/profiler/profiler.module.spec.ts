import { ProfilerModule } from './profiler.module';

describe('ProfilerModule', () => {
  let profilerModule: ProfilerModule;

  beforeEach(() => {
    profilerModule = new ProfilerModule();
  });

  it('should create an instance', () => {
    expect(profilerModule).toBeTruthy();
  });
});
