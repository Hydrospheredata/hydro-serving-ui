import { Inject, Injectable } from '@angular/core';
import { HS_ABSOLUTE_URL } from './base-url.token';

@Injectable({ providedIn: 'root' })
export class ModelUploadingCommandsService {
  constructor(@Inject(HS_ABSOLUTE_URL) private url: string) {}

  getCommands(): string[] {
    return [
      'pip install hs',
      `hs cluster add --name=cluster --server=${this.url}`,
      'hs cluster use cluster',
      'git clone https://github.com/Hydrospheredata/hydro-serving-example.git',
      'cd examples/custom_metrics/census/models/model',
      'hs apply -f serving.yaml',
    ];
  }
}
