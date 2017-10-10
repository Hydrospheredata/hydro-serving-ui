import { XHRBackend } from '@angular/http';
import { Location } from '@angular/common';
import { HydroRequestOptions, HttpService, LoaderStateService } from '@shared/services/_index';



function httpServiceFactory(backend: XHRBackend, options: HydroRequestOptions, location: Location, loaderStateService: LoaderStateService ) {
  return new HttpService(backend, options, location, loaderStateService);
}

export { httpServiceFactory };
