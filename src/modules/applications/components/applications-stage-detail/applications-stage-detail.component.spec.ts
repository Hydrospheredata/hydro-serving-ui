import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlSelectModule } from '@angular-mdl/select';
import { SharedModule } from '@shared/shared.module';

import { MockStoreProvider } from '@testing/mocks';
import { ApplicationsStageDetailComponent } from './applications-stage-detail.component';

import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from '@dialog/dialog.service';

describe('ApplicationsStageDetailComponent', () => {
    let component: ApplicationsStageDetailComponent;
    let fixture: ComponentFixture<ApplicationsStageDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ApplicationsStageDetailComponent],
            imports: [
                MdlSelectModule,
                RouterTestingModule,
                SharedModule,
            ],
            providers: [
                MockStoreProvider,
                DialogService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationsStageDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
