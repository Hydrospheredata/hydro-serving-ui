import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsItemDetailComponent } from './applications-item-detail.component';

describe('ApplicationsItemDetailComponent', () => {
    let component: ApplicationsItemDetailComponent;
    let fixture: ComponentFixture<ApplicationsItemDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ApplicationsItemDetailComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationsItemDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should be created', () => {
    //   expect(component).toBeTruthy();
    // });
});
