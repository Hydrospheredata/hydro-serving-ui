import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesItemDetailComponent } from './services-item-detail.component';

describe('ServicesItemDetailComponent', () => {
    let component: ServicesItemDetailComponent;
    let fixture: ComponentFixture<ServicesItemDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ServicesItemDetailComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ServicesItemDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should be created', () => {
    //   expect(component).toBeTruthy();
    // });
});
