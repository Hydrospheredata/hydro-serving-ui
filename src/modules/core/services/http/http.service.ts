import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

type HydroHttpParams = string | { [param: string]: string | string[]; } | HttpParams;

interface IHydroHttpOptions {
    headers?: any;
    params?: HydroHttpParams;
    [propName: string]: any;
}

@Injectable()
export class HttpService {
    private baseUrl: string = '';

    constructor(
        public http: HttpClient
    ) {
        if (environment.production) {
            const { protocol, hostname, port } = window.location;

            this.baseUrl = `${protocol}//${hostname}:${port}`;
        } else {
            this.baseUrl = `${environment.host}${environment.port ? ':' + environment.port : ''}`;
        }
    }

    get(url: string, options?: IHydroHttpOptions): Observable<any> {
        return this.http.get(this.getFullUrl(url), this.hydroOptions(options)).pipe(
            catchError(err => this.handleError(err))
        );
    }

    getv2(url, options) {
        return this.http.get(url, this.hydroOptions(options)).pipe(
            catchError(err => this.handleError(err))
        );
    }

    delete(url: string, options?: IHydroHttpOptions) {
        return this.http.delete(this.getFullUrl(url), this.hydroOptions(options)).pipe(
            catchError(err => this.handleError(err))
        );
    }

    post(url: string, body, options?: IHydroHttpOptions) {
        return this.http.post(this.getFullUrl(url), body, this.hydroOptions(options)).pipe(
            catchError(err => this.handleError(err))
        );
    }

    put(url: string, body, options?: IHydroHttpOptions) {
        return this.http.put(this.getFullUrl(url), body, this.hydroOptions(options)).pipe(
            catchError(err => this.handleError(err))
        );
    }

    private getFullUrl(url: string): string {
        return `${this.baseUrl}${url}`;
    }

    private handleError(error: HttpErrorResponse): Observable<string> {
        let message: string;
        if (error.error instanceof ErrorEvent) {
            message = `An error occurred: ${error.error.message}`;
        } else {
            const status: number = error.status;

            let err: string = '';
            let information: string = '';
            if (error.error) {
                err = error.error.error || error.name || '';
                information = error.error.information || error.message || '';
            }

            message = `status: ${status}, error: ${err}, message: ${information} `;
        }

        console.error(message);
        return throwError(message);
    }

    private hydroOptions(options: IHydroHttpOptions = {}) {
        if (options === null) {
            return {};
        }

        return {
            ...options,
            params: this.createHttpParams(options.params),
        };
    }

    private createHttpParams(params: string | { [param: string]: string | string[]; } | HttpParams = ''): HttpParams {
        if (params instanceof HttpParams) {
            return params;
        } else if (typeof params === 'string') {
            return new HttpParams({ fromString: params });
        } else if (typeof params === 'object') {
            return new HttpParams({ fromObject: params });
        }
    }
}
