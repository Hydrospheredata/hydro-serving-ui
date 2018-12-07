import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlSelectModule } from '@angular-mdl/select';
import { ReactiveFormsModule } from '@angular/forms';
import {
    DialogAddApplicationComponent
} from '@applications/components';
import { ApplicationFormComponent, KafkaFormComponent, ServiceFormComponent } from '@applications/components/forms';
import { CustomValidatorsService } from '@core/services/custom-validators.service';
import { DialogService } from '@dialog/dialog.service';
import { SharedModule } from '@shared/shared.module';
import { MockStoreProvider } from '@testing/mocks';

describe('DialogAddApplicationComponent', () => {
    let component: DialogAddApplicationComponent;
    let fixture: ComponentFixture<DialogAddApplicationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                ReactiveFormsModule,
                MdlSelectModule,
            ],
            declarations: [
                ApplicationFormComponent,
                DialogAddApplicationComponent,
                KafkaFormComponent,
                ServiceFormComponent,
            ],
            providers: [
                DialogService,
                MockStoreProvider,
                CustomValidatorsService,
            ],
        }).compileComponents();
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
