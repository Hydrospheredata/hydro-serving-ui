import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HydroServingState } from '@core/reducers';
import { DialogService } from '@dialog/dialog.service';
import * as fromModels from '@models/reducers';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { MockModel1 } from '@testing/factories/model';
import { MockModelVersion1Model1, MockModelVersion2Model1 } from '@testing/factories/modelVersion';
import { MockStoreProvider } from '@testing/mocks';
import { MomentModule } from 'angular2-moment';
import { of } from 'rxjs';
import { ModelDetailsComponent } from './model-details.component';

import * as fromModelsActions from '@models/actions';
import { ModelVersionsListComponent } from '@models/components/model-versions-list/model-versions-list.component';

describe('ModelDetailsComponent', () => {
    let component: ModelDetailsComponent;
    let fixture: ComponentFixture<ModelDetailsComponent>;
    let element: HTMLElement;
    let store: Store<HydroServingState>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ModelDetailsComponent,
                ModelVersionsListComponent,
            ],
            imports: [
                SharedModule,
                MomentModule,
                RouterTestingModule,
                StoreModule.forRoot({
                    feature: combineReducers(fromModels.reducers),
                }),
            ],
            providers: [
                MockStoreProvider,
                DialogService,
            ],
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelDetailsComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        store = TestBed.get(Store);

        spyOn(store, 'dispatch').and.callThrough();
        store.dispatch(new fromModelsActions.GetModelVersionsSuccessAction([MockModelVersion1Model1]));

        component.model$ = of(MockModel1);

        fixture.detectChanges();
    });

    it('it should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('header element', () => {
        let headerElement: HTMLElement;

        beforeEach(() => {
            headerElement = element.querySelector('.model-details__header');
        });

        it('exists', () => {
            expect(headerElement).toBeTruthy();
        });

        it('has title element with models name', () => {
            const title = headerElement.querySelector('.model-details__header-title');

            expect(title).toBeTruthy();
            expect(title.textContent).toEqual(MockModel1.name);
        });

        it('has remove button', () => {
            const button = headerElement.querySelector('button');

            expect(button).toBeTruthy();
        });
    });

    describe('versions block', () => {
        let versionsElement: HTMLElement;
        beforeEach(() => {
            versionsElement = element.querySelector('.versions');
        });

        it('exists', () => {
            expect(versionsElement).toBeTruthy();
        });
    });
});
