import { XHRBackend } from '@angular/http';
import { HydroRequestOptions } from '@shared/_index';
import { HttpService } from '@shared/_index';
import { LoaderStateService } from '@shared/_index';
import { Location } from '@angular/common';

function httpServiceFactory(backend: XHRBackend, options: HydroRequestOptions, location: Location, loaderStateService: LoaderStateService ) {
  return new HttpService(backend, options, location, loaderStateService);
}

export { httpServiceFactory };
