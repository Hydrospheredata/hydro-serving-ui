
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { HydroServingState } from '@core/reducers';
import { Store } from '@ngrx/store';
import { GetFieldsAction, GetProfilesAction, CleanProfilesAction} from '@profiler/actions';
import { getFieldsEntitiesState, getProfilesEntitiesState} from '@profiler/selectors';
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

  constructor(private store: Store<HydroServingState>) {
  }

  ngOnInit() {
    console.log(`ngOnInit with id: ${this.modelVersionId} and store: ${this.store}`);
    this.store.dispatch(new GetFieldsAction(this.modelVersionId));
    this.fieldsSub = this.store.select(getFieldsEntitiesState).subscribe(state => {
      this.isLoading = false;
      this.fields = state.fields;
    });
    this.profilesSub = this.store.select(getProfilesEntitiesState).subscribe(state => {
      if (state.profiles != null) {
        this.isLoading = false;
        this.profiles = state.profiles;
      }
    });
    this.intervalId = setInterval(() => {
      if (this.currentField) {
        this.store.dispatch(new GetProfilesAction(this.modelVersionId, this.currentField));
      }
    }, 5000);
  }

  ngOnDestroy() {
    this.store.dispatch(new CleanProfilesAction());
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
    console.log(selectedField);
    this.isLoading = true;
    this.currentField = selectedField;
    this.store.dispatch(new GetProfilesAction(this.modelVersionId, selectedField));
  }
}
