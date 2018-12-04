import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ApplicationsItemDetailComponent } from './applications-item-detail.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoaderStateService, InfluxDBService } from '@core/services';
import { HttpService } from '@core/services/http';
import { MetricsService } from '@core/services/metrics/metrics.service';
import { DialogService } from '@dialog/dialog.service';
import { application } from '@testing/factories/application';
import { MockStoreProvider } from '@testing/mocks';
import { of } from 'rxjs';

describe('ApplicationsItemDetailComponent', () => {
    let component: ApplicationsItemDetailComponent;
    let fixture: ComponentFixture<ApplicationsItemDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ApplicationsItemDetailComponent],
            imports: [
                SharedModule,
                RouterModule,
                SharedModule,
                HttpClientTestingModule,
            ],
            providers: [
                MockStoreProvider,
                DialogService,
                MetricsService,
                LoaderStateService,
                InfluxDBService,
                HttpService,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationsItemDetailComponent);
        component = fixture.componentInstance;
        component.application$ = of(application);

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
