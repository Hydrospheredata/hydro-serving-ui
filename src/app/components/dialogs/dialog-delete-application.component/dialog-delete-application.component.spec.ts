import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogDeleteApplicationComponent } from './dialog-delete-application.component';

describe('DialogDeleteApplicationComponent', () => {
    let component: DialogDeleteApplicationComponent;
    let fixture: ComponentFixture<DialogDeleteApplicationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogDeleteApplicationComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogDeleteApplicationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
