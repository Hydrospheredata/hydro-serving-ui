import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlSelectModule } from '@angular-mdl/select';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignaturesService } from '@core/services';
import { HttpService } from '@core/services/http';
import {
    ProfilesComparisonHistogramComponent,
    ProfilesComponent,
    ProfileStatsComponent,
} from '@profiler/components';
import { SharedModule } from '@shared/shared.module';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';
import { MockStoreProvider } from '@testing/mocks';
import { MomentModule } from 'angular2-moment';
import { of } from 'rxjs';
import { ModelVersionDetailsComponent } from './model-version-details.component';

describe('ModelVersionDetailsComponent', () => {
    let component: ModelVersionDetailsComponent;
    let fixture: ComponentFixture<ModelVersionDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ModelVersionDetailsComponent,
            ],
            imports: [
                MdlSelectModule,
                SharedModule,
                RouterTestingModule,
                MomentModule,
                HttpClientTestingModule,
            ],
            providers: [
                MockStoreProvider,
                SignaturesService,
                HttpService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelVersionDetailsComponent);
        component = fixture.componentInstance;
        component.modelVersion$ = of(MockModelVersion1Model1);
        fixture.detectChanges();
    });

    it('it should be created', () => {
        expect(component).toBeTruthy();
    });
});
