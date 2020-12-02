import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface HydroConfig {
  showHeader: boolean;
}

const defaultConfig: HydroConfig = {
  showHeader: true,
};

@Injectable({
  providedIn: 'root',
})
export class HydroConfigService {
  public config: HydroConfig = defaultConfig;
  constructor(private readonly http: HttpClient) {}

  loadConfig() {
    return this.http
      .get<HydroConfig>(`/assets/config.json`)
      .toPromise()
      .then((data: any) => (this.config = data))
      .catch((_: any) => {
        console.warn(`Couldn't load config,using default config`);
        return Promise.resolve();
      });
  }
}
