import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateApplicationComponent } from './dialog-update-application.component';

describe('DialogUpdateApplicationComponent', () => {
    let component: DialogUpdateApplicationComponent;
    let fixture: ComponentFixture<DialogUpdateApplicationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogUpdateApplicationComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogUpdateApplicationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
