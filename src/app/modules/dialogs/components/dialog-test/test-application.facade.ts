import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApplicationService } from '@app/core/data/services/application.service';
import { switchMap } from 'rxjs/operators';

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
