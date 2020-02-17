import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ZenModeService {
  isZenMode$: Observable<boolean>;
  constructor(private route: ActivatedRoute) {
    this.isZenMode$ = this.route.queryParams.pipe(
      map(queryParams => {
        return queryParams && queryParams.zenMode || false;
      })
    );
  }
}
