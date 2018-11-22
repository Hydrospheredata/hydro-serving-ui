import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsStageDetailComponent } from './applications-stage-detail.component';

describe('ApplicationsStageDetailComponent', () => {
    let component: ApplicationsStageDetailComponent;
    let fixture: ComponentFixture<ApplicationsStageDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ApplicationsStageDetailComponent],
        })
            .compileComponents();
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
