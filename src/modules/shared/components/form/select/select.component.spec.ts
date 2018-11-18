import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextComponent } from '@shared/components/form/input-text/input-text.component';

describe('InputTextComponent', () => {
    let component: InputTextComponent;
    let fixture: ComponentFixture<InputTextComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InputTextComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
