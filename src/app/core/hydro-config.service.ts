import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

export interface HydroConfig {
  showHeader: boolean;
  liftMetadata: boolean;
}

const defaultConfig: HydroConfig = {
  showHeader: true,
  liftMetadata: false,
};

@Injectable({
  providedIn: 'root',
})
export class HydroConfigService {
  public config: HydroConfig = defaultConfig;
  constructor(
    private readonly http: HttpClient,
    @Inject(APP_BASE_HREF) private href: string,
  ) {}

  loadConfig() {
    return this.http
      .get<HydroConfig>(`${this.href}assets/config.json`)
      .toPromise()
      .then((data: any) => (this.config = data))
      .catch((_: any) => {
        console.warn(`Couldn't load config,using default config`);
        return Promise.resolve();
      });
  }
}
