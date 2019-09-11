import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { HydroServingState } from '@core/store';
import { Store } from '@ngrx/store';
import {
  GetFields,
  selectFieldsEntitiesState,
  selectProfilesEntitiesState,
  GetProfiles,
  CleanProfiles,
} from '@profiler/store';
import { Profiles } from '@shared/models/_index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hs-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilesComponent implements OnInit, OnDestroy {
  @Input() modelVersionId: number;
  public fields: string[] = [];
  public isLoading: boolean = true;
  public profiles: Profiles;

  private fieldsSub: Subscription;
  private profilesSub: Subscription;
  private currentField: string;
  private intervalId: any;

  constructor(private store: Store<HydroServingState>) {}

  ngOnInit() {
    this.store.dispatch(
      GetFields({ modelVersionId: `${this.modelVersionId}` })
    );
    this.fieldsSub = this.store
      .select(selectFieldsEntitiesState)
      .subscribe(state => {
        this.isLoading = false;
        this.fields = state.fields;
      });
    this.profilesSub = this.store
      .select(selectProfilesEntitiesState)
      .subscribe(state => {
        if (state.profiles != null) {
          this.isLoading = false;
          this.profiles = state.profiles;
        }
      });
    this.intervalId = setInterval(() => {
      if (this.currentField) {
        this.store.dispatch(
          GetProfiles({
            modelVersionId: this.modelVersionId,
            fieldName: this.currentField,
          })
        );
      }
    }, 5000);
  }

  ngOnDestroy() {
    this.store.dispatch(CleanProfiles());
    if (this.fieldsSub) {
      this.fieldsSub.unsubscribe();
    }
    if (this.profilesSub) {
      this.profilesSub.unsubscribe();
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onFieldSelect(selectedField) {
    this.isLoading = true;
    this.currentField = selectedField;
    this.store.dispatch(
      GetProfiles({
        modelVersionId: this.modelVersionId,
        fieldName: selectedField,
      })
    );
  }
}
