import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationBuilder } from '@core/builders/application.builder';
import { DialogService } from '@dialog/dialog.service';
import {
  MockStoreProvider,
  MockSelectedModelVariantProvider,
  MockLatestModelVersionId,
} from '@testing/mocks';
import { DialogUpdateModelVersionComponent, SELECTED_MODEL_VARIANT, LATEST_MODEL_VERSION } from './dialog-update-model-version.component';
import { MockModelVersion1Model1, MockModelVersion2Model1 } from '@testing/factories/modelVersion';

describe('DialogUpdateModelVersionComponent', () => {
  let component: DialogUpdateModelVersionComponent;
  let fixture: ComponentFixture<DialogUpdateModelVersionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogUpdateModelVersionComponent],
      providers: [
        DialogService,
        MockStoreProvider,
        ApplicationBuilder,
        MockSelectedModelVariantProvider,
        MockLatestModelVersionId,
        { provide: LATEST_MODEL_VERSION, useValue: MockModelVersion2Model1 },
        { provide: SELECTED_MODEL_VARIANT, useValue: {modelVersion: MockModelVersion1Model1} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateModelVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
