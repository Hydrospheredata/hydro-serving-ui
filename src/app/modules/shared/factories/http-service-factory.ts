import { XHRBackend } from '@angular/http';
import { Location } from '@angular/common';
import { HttpService, HydroRequestOptions, LoaderStateService } from '@shared/_index';
// import { HttpService } from '@shared/http.service';
// import { LoaderStateService } from '@shared/loader-state.service';

function httpServiceFactory(backend: XHRBackend, options: HydroRequestOptions, location: Location, loaderStateService: LoaderStateService ) {
  return new HttpService(backend, options, location, loaderStateService);
}

export { httpServiceFactory };
