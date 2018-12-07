import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlSelectModule } from '@angular-mdl/select';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationFormComponent, KafkaFormComponent, ServiceFormComponent } from '@applications/components/forms';
import { CustomValidatorsService } from '@core/services/custom-validators.service';
import { DialogService } from '@dialog/dialog.service';
import { SharedModule } from '@shared/shared.module';
import { application } from '@testing/factories/application';
import { MockStoreProvider } from '@testing/mocks';
import { of } from 'rxjs';
import { DialogUpdateApplicationComponent, SELECTED_UPD_APPLICATION$ } from './dialog-update-application.component';

describe('DialogUpdateApplicationComponent', () => {
    let component: DialogUpdateApplicationComponent;
    let fixture: ComponentFixture<DialogUpdateApplicationComponent>;

    beforeEach(async(() => {
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
                ServiceFormComponent,
            ],
            providers: [
                { provide: SELECTED_UPD_APPLICATION$, useValue: of(application) },
                MockStoreProvider,
                DialogService,
                CustomValidatorsService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogUpdateApplicationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
