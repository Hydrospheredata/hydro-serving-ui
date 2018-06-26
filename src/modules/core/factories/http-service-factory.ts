import { XHRBackend } from '@angular/http';
import { HydroRequestOptions, HttpService } from '@core/services/http/_index';
import { LoaderStateService } from '@core/services';



function httpServiceFactory(backend: XHRBackend, options: HydroRequestOptions, loaderStateService: LoaderStateService) {
    return new HttpService(backend, options, loaderStateService);
}

export { httpServiceFactory };
