import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HydroSelectComponent } from '@shared/components/form/select/select.component';

describe('SelectComponent', () => {
    let component: HydroSelectComponent;
    let fixture: ComponentFixture<HydroSelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HydroSelectComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HydroSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
