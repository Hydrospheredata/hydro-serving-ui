import { Component, Input, OnInit } from '@angular/core';
import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { ServablesFacade } from '@app/core/facades/servables.facade';
import {
  Application,
  Servable,
  ModelVersion,
} from '@app/core/data/types';

import { Observable } from 'rxjs';

@Component({
  selector: 'hs-servable-names',
  templateUrl: './servable-names.component.html',
  styleUrls: ['./servable-names.component.scss']
})
export class ServableNamesComponent implements OnInit {
  application$: Observable<Application>;
  servables$: Observable<Servable[]>;

  constructor(
    private readonly applicationFacade: ApplicationsFacade,
    private readonly servableFacade: ServablesFacade
  ) { }

  ngOnInit() {
    this.application$ = this.applicationFacade.selectedApplication();
    this.servables$ = this.servableFacade.allServables();
  }

  get servableNames(): string[] {
    let modelVersion: ModelVersion;
    let names: string[];
    this.application$.subscribe(application => {
      modelVersion = application.executionGraph.stages[0].modelVariants[0].modelVersion;
      this.servables$.subscribe(servables => {
        names = servables.filter(servable => servable.modelVersion.id === modelVersion.id).map(servable => servable.fullName);
      })
    });
    if (names.length === 0) {
      return ['No servables found!']
    }
    return names;

  }

}
