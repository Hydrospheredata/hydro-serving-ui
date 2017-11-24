import { XHRBackend } from '@angular/http';
import { HydroRequestOptions, HttpService } from '@shared/services/http/_index';



function httpServiceFactory(backend: XHRBackend, options: HydroRequestOptions ) {
    return new HttpService(backend, options);
}

export { httpServiceFactory };
