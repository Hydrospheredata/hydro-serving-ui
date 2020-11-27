import { ZenModeService } from '@app/core/zenmode.service';
import { of } from 'rxjs';

export const MockZenModeServiceProvider = {
  provide: ZenModeService,
  useValue: {
    isZenMode$: of(false),
  },
};
