import { environment } from '@environments/environment';
import { InjectionToken } from '@angular/core';

export const HS_BASE_URL = new InjectionToken<string>('');

export function hsBaseUrlFactory(baseHref: string = ''): string {
  return environment.production
    ? `${baseHref}`
    : `${environment.host}${
        environment.port ? ':' + environment.port : ''
      }${baseHref}`;
}
