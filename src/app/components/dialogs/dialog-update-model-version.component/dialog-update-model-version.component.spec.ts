import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogUpdateModelVersionComponent } from './dialog-update-model-version.component';

describe('DialogUpdateModelVersionComponent', () => {
    let component: DialogUpdateModelVersionComponent;
    let fixture: ComponentFixture<DialogUpdateModelVersionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogUpdateModelVersionComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogUpdateModelVersionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
