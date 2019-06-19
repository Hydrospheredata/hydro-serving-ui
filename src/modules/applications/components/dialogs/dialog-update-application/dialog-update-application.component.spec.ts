import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlSelectModule } from '@angular-mdl/select';
import { ReactiveFormsModule } from '@angular/forms';
import {
    ApplicationFormComponent,
    KafkaFormComponent,
    ModelVariantFormComponent
} from '@applications/components/forms';
import { CustomValidatorsService } from '@core/services/custom-validators.service';
import { DialogService } from '@dialog/dialog.service';
import { SharedModule } from '@shared/shared.module';
import { MockApplication } from '@testing/factories/application';
import { MockStoreProvider } from '@testing/mocks';
import { of } from 'rxjs';
import { DialogUpdateApplicationComponent, SELECTED_UPD_APPLICATION$ } from './dialog-update-application.component';

describe('DialogUpdateApplicationComponent', () => {
    let component: DialogUpdateApplicationComponent;
    let fixture: ComponentFixture<DialogUpdateApplicationComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                ReactiveFormsModule,
                MdlSelectModule,
            ],
            declarations: [
                DialogUpdateApplicationComponent,
                ApplicationFormComponent,
                KafkaFormComponent,
                ModelVariantFormComponent,
            ],
            providers: [
                { provide: SELECTED_UPD_APPLICATION$, useValue: of(MockApplication) },
                MockStoreProvider,
                DialogService,
                CustomValidatorsService,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogUpdateApplicationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
