import { Input, TestStatus } from '@app/core/data/types';
import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { Injectable, OnDestroy } from '@node_modules/@angular/core';
import {
  Observable,
  of,
  BehaviorSubject,
  Subject,
  Subscription,
} from '@node_modules/rxjs';
import { ApplicationService } from '@app/core/data/services/application.service';
import {
  switchMap,
  catchError,
  tap,
} from '@node_modules/rxjs/internal/operators';

@Injectable()
export class TestApplicationFacade {
  private output: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private readonly output$ = this.output.asObservable();

  constructor(
    private readonly facade: ApplicationsFacade,
    private readonly api: ApplicationService
  ) {}

  generateInput(): Observable<string> {
    return this.facade.selectedApplication().pipe(
      switchMap(({ name }) => {
        return this.api.generateInputs(name);
      })
    );
  }

  testApplication(input: string) {
    this.facade
      .selectedApplication()
      .pipe(
        switchMap(application => {
          return this.api.serveService(JSON.parse(input), application.name);
        })
      )
      .subscribe(
        output => this.output.next(JSON.stringify(output, undefined, 2)),
        output => this.output.next(JSON.stringify(output, undefined, 2))
      );
  }

  getOutput(): Observable<string> {
    return this.output$;
  }
}
