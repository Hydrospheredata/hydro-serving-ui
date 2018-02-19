import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesWrapperComponent } from './services-wrapper.component';

describe('ServicesWrapperComponent', () => {
    let component: ServicesWrapperComponent;
    let fixture: ComponentFixture<ServicesWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ServicesWrapperComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ServicesWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should be created', () => {
    //   expect(component).toBeTruthy();
    // });
});
