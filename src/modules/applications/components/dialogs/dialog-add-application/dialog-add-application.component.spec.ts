import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
    DialogAddApplicationComponent
} from '@applications/components';

describe('DialogAddApplicationComponent', () => {
    let component: DialogAddApplicationComponent;
    let fixture: ComponentFixture<DialogAddApplicationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [DialogAddApplicationComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogAddApplicationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
