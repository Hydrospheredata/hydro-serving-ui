import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@node_modules/@angular/common';
import { Inject } from '@node_modules/@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SvgSpriteService {
  constructor(
    private http: HttpClient,
    @Inject(APP_BASE_HREF) private href: string
  ) {}

  public loadSvgSprite() {
    if (
      !document.createElementNS ||
      !document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        .createSVGRect
    ) {
      return true;
    }

    const fileUrl = 'assets/images/sprites/hydro-sprite.svg';
    const url = this.href + fileUrl;

    const { protocol, port, hostname } = window.location;

    this.http
      .get(url, { observe: 'body', responseType: 'text' })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.error(`Can't load svg sprite. Error: ${err.message}`);
          return of('');
        })
      )
      .subscribe(res => {
        const insert = () =>
          document.body.insertAdjacentHTML('afterbegin', res);

        document.body
          ? insert()
          : document.addEventListener('DOMContentLoaded', insert);
      });
  }
}
