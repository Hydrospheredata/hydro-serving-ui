import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturesComponent } from './signatures.component';

describe('SignaturesComponent', () => {
    let component: SignaturesComponent;
    let fixture: ComponentFixture<SignaturesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SignaturesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignaturesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should be created', () => {
    //   expect(component).toBeTruthy();
    // });
});
