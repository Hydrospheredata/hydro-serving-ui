import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HS_BASE_URL } from '@core/base-url.token';
import { Inject } from '@node_modules/@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

type HydroHttpParams =
  | string
  | { [param: string]: string | string[] }
  | HttpParams;

interface IHydroHttpOptions {
  headers?: any;
  params?: HydroHttpParams;
  [propName: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    public http: HttpClient,
    @Inject(HS_BASE_URL) private url: string
  ) {}

  get<T>(url: string, options?: IHydroHttpOptions) {
    return this.http
      .get<T>(this.getFullUrl(url), this.hydroOptions(options))
      .pipe(catchError(err => this.handleError(err)));
  }

  delete(url: string, options?: IHydroHttpOptions) {
    return this.http
      .delete(this.getFullUrl(url), this.hydroOptions(options))
      .pipe(catchError(err => this.handleError(err)));
  }

  post<T>(url: string, body, options?: IHydroHttpOptions) {
    return this.http
      .post<T>(this.getFullUrl(url), body, this.hydroOptions(options))
      .pipe(catchError(this.handleError));
  }

  put(url: string, body, options?: IHydroHttpOptions) {
    return this.http
      .put(this.getFullUrl(url), body, this.hydroOptions(options))
      .pipe(catchError(err => this.handleError(err)));
  }

  private getFullUrl(url: string): string {
    return this.url + url;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message: string;
    if (error.error instanceof ErrorEvent) {
      message = `An error occurred: ${error.error.message}`;
    } else {
      const status: number = error.status;

      let err: string = error.name;
      let information: string = error.message;
      if (error.error) {
        err = error.error.error || error.name || '';
        information = error.error.information || error.error.message || '';
      }

      message = `status: ${status}, error: ${err}, message: ${information} `;
    }
    return throwError(message);
  }

  private hydroOptions(options: IHydroHttpOptions = {}) {
    if (options === null) {
      return {};
    }

    const res = {
      ...options,
      params: this.createHttpParams(options.params),
    };

    return res;
  }

  private createHttpParams(
    params: string | { [param: string]: string | string[] } | HttpParams = ''
  ): HttpParams {
    if (params instanceof HttpParams) {
      return params;
    } else if (typeof params === 'string') {
      return new HttpParams({ fromString: params });
    } else if (typeof params === 'object') {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          if (params[key] === undefined) {
            delete params[key];
          }
        }
      }
      return new HttpParams({ fromObject: params });
    }
  }
}
