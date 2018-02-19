import { XHRBackend } from '@angular/http';
import { HydroRequestOptions, HttpService } from '@shared/services/http/_index';
import { LoaderStateService } from '@shared/services/_index';



function httpServiceFactory(backend: XHRBackend, options: HydroRequestOptions, loaderStateService: LoaderStateService) {
    return new HttpService(backend, options, loaderStateService);
}

export { httpServiceFactory };
