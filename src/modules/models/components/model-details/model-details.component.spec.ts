import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DialogService } from '@dialog/dialog.service';
import { ModelsFacade } from '@models/store';
import { SharedModule } from '@shared/shared.module';
import * as mockComponents from '@testing/components';
import { ModelVersionsTableComponent } from '@testing/components';
import { MockModel1 } from '@testing/factories/model';
import { MockZenModeServiceProvider } from '@testing/services/zenMode.service';
import { of } from 'rxjs';
import { ModelDetailsComponent } from './model-details.component';

describe('ModelDetailsComponent', () => {
  let component: ModelDetailsComponent;
  let fixture: ComponentFixture<ModelDetailsComponent>;
  let element: HTMLElement;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModelDetailsComponent,
        mockComponents.ModelVersionsTableComponent,
      ],
      imports: [SharedModule],
      providers: [
        DialogService,
        {
          provide: ModelsFacade,
          useValue: {
            selectedModel$: of(MockModel1),
          },
        },
        MockZenModeServiceProvider,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDetailsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('it should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('header element', () => {
    let headerElement: HTMLElement;

    beforeEach(() => {
      headerElement = element.querySelector('.model-details__header');
    });

    it('exists', () => {
      expect(headerElement).toBeTruthy();
    });

    it('has remove button', () => {
      const button = headerElement.querySelector('button');

      expect(button).toBeTruthy();
    });
  });

  describe('versions block', () => {
    let versionsDebugElement: DebugElement;
    beforeEach(() => {
      versionsDebugElement = debugElement.query(
        By.directive(ModelVersionsTableComponent)
      );
    });

    it('exists', () => {
      expect(versionsDebugElement).toBeTruthy();
    });
  });
});
