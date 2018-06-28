import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogDeleteModelComponent } from './dialog-delete-model.component';

describe('DialogDeleteServiceComponent', () => {
    let component: DialogDeleteModelComponent;
    let fixture: ComponentFixture<DialogDeleteModelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogDeleteModelComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogDeleteModelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
