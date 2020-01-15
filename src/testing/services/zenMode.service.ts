import { ZenModeService } from '@core/services/zenmode.service';
import { of } from 'rxjs';

export const MockZenModeServiceProvider = {
  provide: ZenModeService,
  useValue: {
    isZenMode$: of(false),
  },
};
