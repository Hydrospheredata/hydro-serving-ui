import { XHRBackend } from '@angular/http';
import { HydroRequestOptions } from '@services/hydro-request-options';
import { HttpService } from '@services/http.service';
import { LoaderService } from '@services/loader.service';
import { Location } from '@angular/common';

function httpServiceFactory(backend: XHRBackend, options: HydroRequestOptions, location: Location, loaderService: LoaderService ) {
  return new HttpService(backend, options, location, loaderService);
}

export { httpServiceFactory };
