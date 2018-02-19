import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddServiceComponent } from './dialog-add-service.component';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppModule } from '../../../app.module';

describe('DialogAddServiceComponent', () => {
    let component: DialogAddServiceComponent;
    let fixture: ComponentFixture<DialogAddServiceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ ],
            declarations: [DialogAddServiceComponent],
            providers: [FormArray, FormBuilder, FormControl, FormGroup, Validators]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogAddServiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should be created', () => {
    //   expect(component).toBeTruthy();
    // });
});
