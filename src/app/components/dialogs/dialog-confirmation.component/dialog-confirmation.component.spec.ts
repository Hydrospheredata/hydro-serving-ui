import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogConfirmationComponent } from './dialog-confirmation.component';

describe('DialogConfirmationComponent', () => {
    let component: DialogConfirmationComponent;
    let fixture: ComponentFixture<DialogConfirmationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogConfirmationComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogConfirmationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
