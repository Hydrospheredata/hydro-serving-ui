import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '@environments/environment';
import 'rxjs/Rx';
import {
    Http,
    RequestOptionsArgs,
    Response,
    Headers,
    XHRBackend
} from '@angular/http';
import { HydroRequestOptions } from './hydro-request-options';
import { LoaderStateService } from '../loader-state.service';



@Injectable()
export class HttpService extends Http {
    baseUrl: string;
    private requestCount: number;

    constructor(
        backend: XHRBackend,
        defaultOptions: HydroRequestOptions,
        private loaderStateService: LoaderStateService
    ) {
        super(
            backend,
            defaultOptions
        );

        this.baseUrl = environment.production ?
            `http://${window.location.hostname}:${window.location.port}` :
            `${environment.host}:${environment.port}`;

        this.requestCount = 0;
    }

    get(url: string, options?: RequestOptionsArgs): Observable<any> {

        this.showLoader();

        return super.get(this.getFullUrl(url), this.requestOptions(options))
            .catch(this.onCatch)
            .do(() => {
                this.onSuccess();
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }

    post(url: string, body, options?: RequestOptionsArgs): Observable<any> {

        this.showLoader();

        return super.post(this.getFullUrl(url), body, this.requestOptions(options))
            .catch(this.onCatch)
            .do(() => {
                this.onSuccess();
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }

    put(url: string, body, options?: RequestOptionsArgs): Observable<any> {

        this.showLoader();

        return super.put(this.getFullUrl(url), body, this.requestOptions(options))
            .catch(this.onCatch)
            .do(() => {
                this.onSuccess();
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<any> {

        this.showLoader();

        return super.delete(this.getFullUrl(url), this.requestOptions(options))
            .catch(this.onCatch)
            .do(() => {
                this.onSuccess();
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }

    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {

        if (options == null) {
            options = new HydroRequestOptions();
        }

        if (options.headers == null) {
            options.headers = new Headers();
        }

        return options;
    }

    private getFullUrl(url: string): string {
        if (url.startsWith("http")) {
            return url;
        }
        return this.baseUrl + url;
    }

    private onCatch(error: any): Observable<any> {
        let errMsg: string;
        if (error instanceof Response) {
            let body;
            try {
                body = error.json();
            } catch (e) {
                body = error.text();
            }

            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

    private onSuccess() {
    }

    private onError(res: Response) {
        console.log('Error, status code: ' + res.status);
    }

    private onEnd() {
        this.hideLoader();
    }

    private showLoader() {
        if (this.requestCount === 0) {
            this.loaderStateService.showLoader();
        }
        this.requestCount++;
    }

    private hideLoader() {
        if (--this.requestCount === 0) {
            this.loaderStateService.hideLoader();
        }
    }
}
