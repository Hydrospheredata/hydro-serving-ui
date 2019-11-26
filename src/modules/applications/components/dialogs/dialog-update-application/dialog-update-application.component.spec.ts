import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlSelectModule } from '@angular-mdl/select';
import { Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ApplicationsFacade } from '@applications/store';
import { CustomValidatorsService } from '@core/services/custom-validators.service';
import { DialogService } from '@dialog/dialog.service';
import { SharedModule } from '@shared/shared.module';
import { ApplicationFormComponent } from '@testing/components';
import { MockApplication } from '@testing/factories/application';
import {
  DialogUpdateApplicationComponent,
  SELECTED_UPD_APPLICATION,
} from './dialog-update-application.component';

const applicationsFacadeProvider: Provider = {
  provide: ApplicationsFacade,
  useValue: {},
};
describe('DialogUpdateApplicationComponent', () => {
  let component: DialogUpdateApplicationComponent;
  let fixture: ComponentFixture<DialogUpdateApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, ReactiveFormsModule, MdlSelectModule],
      declarations: [
        DialogUpdateApplicationComponent,
        ApplicationFormComponent,
      ],
      providers: [
        { provide: SELECTED_UPD_APPLICATION, useValue: MockApplication },
        applicationsFacadeProvider,
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
