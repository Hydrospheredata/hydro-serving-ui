import { XHRBackend } from '@angular/http';
import { HydroRequestOptions } from '@services/hydro-request-options';
import { HttpService } from '@services/http.service';
import { LoaderStateService } from '@services/loader-state.service';
import { Location } from '@angular/common';

function httpServiceFactory(backend: XHRBackend, options: HydroRequestOptions, location: Location, loaderStateService: LoaderStateService ) {
  return new HttpService(backend, options, location, loaderStateService);
}

export { httpServiceFactory };
