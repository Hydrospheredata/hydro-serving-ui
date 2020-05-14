import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from '@node_modules/rxjs';
import { ModelVersion } from '@shared/models';
import { Stat } from '../../models';
import { StatFacade } from '../../stat.facade';
import { StatState } from '../../store/stat.state';

@Component({
  templateUrl: './stat-page.component.html',
  styleUrls: ['./stat-page.component.scss'],
  providers: [StatState, StatFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatPageComponent implements OnInit {
  stat$: Observable<Stat>;
  error$: Observable<string>;
  modelVersion$: Observable<ModelVersion>;
  isLoading$: Observable<boolean>;

  constructor(private statFacade: StatFacade) {}

  ngOnInit() {
    this.modelVersion$ = this.statFacade.getModelVersion();
    this.error$ = this.statFacade.getError();
    this.stat$ = this.statFacade.getStat();
    this.isLoading$ = this.statFacade.isLoading();

    this.statFacade.loadingStat();
  }
}
