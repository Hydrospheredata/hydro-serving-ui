import { Profiles } from '@shared/models/_index';
import { GetProfilesAction, CleanProfilesAction } from '@profiles/actions';
import { GetFieldsAction } from '@profiles/actions';
import { Subscription } from 'rxjs/Subscription';
import { HydroServingState } from '@core/reducers';
import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Store } from '@ngrx/store';
import * as fromProfiles from '@profiles/reducers';

@Component({
  selector: 'hydro-data-profiles',
  templateUrl: './data-profiles.component.html',
  styleUrls: ['./data-profiles.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataProfilesComponent implements OnInit, OnDestroy {

  @Input() modelVersionId: number;

  private fieldsSub: Subscription;
  private profilesSub: Subscription;
  public fields: Array<string> = [];
  public isLoading: boolean = true;
  public profiles: Profiles;
  private currentField: string;
  private intervalId: any;

  constructor(private store: Store<HydroServingState>) {}

  ngOnInit() {
    console.log(`ngOnInit with id: ${this.modelVersionId} and store: ${this.store}`);
    this.store.dispatch(new GetFieldsAction(this.modelVersionId));
    this.fieldsSub = this.store.select(fromProfiles.getFieldsEntitiesState).subscribe(state => {
      this.isLoading = false;
      this.fields = state.fields;
    });
    this.profilesSub = this.store.select(fromProfiles.getProfilesEntitiesState).subscribe(state => {
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
    console.log(`ngOnDestroy`);
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