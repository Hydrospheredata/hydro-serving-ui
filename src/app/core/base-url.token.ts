import { environment } from '@environments/environment';
import { InjectionToken } from '@node_modules/@angular/core';

export const HS_BASE_URL: InjectionToken<string> = new InjectionToken<string>(
  ''
);

export function hsBaseUrlFactory(baseHref: string): string {
  return environment.production
    ? `${baseHref}`
    : `${environment.host}${
        environment.port ? ':' + environment.port : ''
      }${baseHref}`;
}
