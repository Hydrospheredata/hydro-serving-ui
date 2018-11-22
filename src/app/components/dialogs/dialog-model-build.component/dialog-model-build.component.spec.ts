import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DialogModelBuildComponent } from './dialog-model-build.component';

describe('DialogModelBuildComponent', () => {

    let component: DialogModelBuildComponent;
    let fixture: ComponentFixture<DialogModelBuildComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogModelBuildComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogModelBuildComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
