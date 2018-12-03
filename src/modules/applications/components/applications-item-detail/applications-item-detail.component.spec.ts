import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ApplicationsItemDetailComponent } from './applications-item-detail.component';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { LoaderStateService, InfluxDBService } from '@core/services';
import { HttpService } from '@core/services/http';
import { MetricsService } from '@core/services/metrics/metrics.service';
import { DialogService } from '@dialog/dialog.service';
import { Store } from '@ngrx/store';
import { MockStoreProvider } from '@testing/mocks';

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
            ],
            providers: [
                MockStoreProvider,
                DialogService,
                MetricsService,
                LoaderStateService,
                InfluxDBService,
                HttpHandler,
                HttpClient,
                HttpService,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationsItemDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
