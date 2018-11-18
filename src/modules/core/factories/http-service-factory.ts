import { XHRBackend } from '@angular/http';
import { LoaderStateService } from '@core/services';
import { HydroRequestOptions, HttpService } from '@core/services/http/_index';

function httpServiceFactory(backend: XHRBackend, options: HydroRequestOptions, loaderStateService: LoaderStateService) {
    return new HttpService(backend, options, loaderStateService);
}

export { httpServiceFactory };
