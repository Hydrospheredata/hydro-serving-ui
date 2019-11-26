import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlSelectModule } from '@angular-mdl/select';
import { Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DialogAddApplicationComponent } from '@applications/components';
import {
  KafkaFormComponent,
  ModelVariantFormComponent,
} from '@applications/components/forms';
import { ApplicationsFacade } from '@applications/store';
import { CustomValidatorsService } from '@core/services/custom-validators.service';
import { DialogService } from '@dialog/dialog.service';
import { SharedModule } from '@shared/shared.module';
import { ApplicationFormComponent } from '@testing/components';

const applicationFacadeProvider: Provider = {
  provide: ApplicationsFacade,
  useValue: {},
};

describe('DialogAddApplicationComponent', () => {
  let component: DialogAddApplicationComponent;
  let fixture: ComponentFixture<DialogAddApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, ReactiveFormsModule, MdlSelectModule],
      declarations: [
        ApplicationFormComponent,
        DialogAddApplicationComponent,
        KafkaFormComponent,
        ModelVariantFormComponent,
      ],
      providers: [
        DialogService,
        CustomValidatorsService,
        applicationFacadeProvider,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('shows applicationForm component', () => {
    const formComponent = fixture.debugElement.query(
      By.directive(ApplicationFormComponent)
    );
    expect(formComponent).toBeDefined();
  });
});
