import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment';
import 'rxjs/Rx';
import {
  Http,
  RequestOptionsArgs,
  Response,
  Headers,
  XHRBackend
} from '@angular/http';
import { Location } from '@angular/common';
import { HydroRequestOptions } from './hydro-request-options';
import {LoaderStateService} from './loader-state.service';

@Injectable()
export class HttpService extends Http {
  port: string;
  baseUrl: string;
  private requestCount: number;

  constructor(backend: XHRBackend,
              defaultOptions: HydroRequestOptions,
              private location: Location,
              private loaderStateService: LoaderStateService,
              ) {
    super(backend, defaultOptions);

    this.port = environment.production ? window.location.port : environment.port;
    this.baseUrl = `http://localhost:${this.port}`;
    this.requestCount = 0;
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {

    this.showLoader();

    return super.get(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
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
      .do((res: Response) => {
        this.onSuccess(res);
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
      .do((res: Response) => {
        this.onSuccess(res);
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
      .do((res: Response) => {
        this.onSuccess(res);
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
    return this.baseUrl + url;
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
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
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private onSuccess(res: Response): void {
  }

  private onError(res: Response): void {
    console.log('Error, status code: ' + res.status);
  }

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    if (this.requestCount === 0) {
      this.loaderStateService.showLoader();
    }
    this.requestCount++;
  }

  private hideLoader(): void {
    if (--this.requestCount === 0) {
      this.loaderStateService.hideLoader();
    }
  }
}
