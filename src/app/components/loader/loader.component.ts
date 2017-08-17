import { Component, OnDestroy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from '@services/loader.service';
import { LoaderState } from './loader';

@Component({
  selector: 'hydro-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements AfterViewChecked, OnDestroy {

  public show: boolean;

  private subscription: Subscription;

  constructor(
    private loaderService: LoaderService,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewChecked() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
        // workaround to fix Error: ExpressionChangedAfterItHasBeenCheckedError
        // todo find better solution
        this.cd.detectChanges();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
