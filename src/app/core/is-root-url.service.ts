import { Inject, Injectable } from '@angular/core';
import { RouterEvent } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class IsRootUrlService {
  constructor(@Inject(APP_BASE_HREF) public baseHref: string) {}

  isRootUrl(event: RouterEvent): boolean {
    const n = this.baseHref.split('/').filter(_ => _).length;
    return event.url.split('/').length <= 2 + n;
  }
}
