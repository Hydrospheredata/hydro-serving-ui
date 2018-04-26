import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSourceComponent } from './dialog-add-source.component';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

describe('DialogAddSourceComponent', () => {
    let component: DialogAddSourceComponent;
    let fixture: ComponentFixture<DialogAddSourceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [DialogAddSourceComponent],
            providers: [FormArray, FormBuilder, FormControl, FormGroup, Validators]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogAddSourceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
