import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UiBuildInfo {
  version?: string;
  gitHeadCommit?: string;
  gitCurrentBranch?: string;
  nodeVersion?: string;
}

const defaultConfig: UiBuildInfo = {};

@Injectable({
  providedIn: 'root',
})
export class UiBuildInfoService {
  public config: UiBuildInfo = defaultConfig;
  constructor(private readonly http: HttpClient) {}

  loadConfig() {
    return this.http
      .get<UiBuildInfo>(`/assets/buildinfo.json`)
      .toPromise()
      .then((data: any) => (this.config = data))
      .catch((_: any) => {
        console.warn(`Couldn't load config,using default config`);
        return Promise.resolve();
      });
  }
}
