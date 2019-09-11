import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from '@dialog/dialog.service';
import { ModelsFacade } from '@models/store';
import { SharedModule } from '@shared/shared.module';
import * as mockComponents from '@testing/components';
import { MockModel1 } from '@testing/factories/model';
import { of } from 'rxjs';
import { ModelDetailsComponent } from './model-details.component';

describe('ModelDetailsComponent', () => {
  let component: ModelDetailsComponent;
  let fixture: ComponentFixture<ModelDetailsComponent>;
  let element: HTMLElement;

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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDetailsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
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

    it('has title element with models name', () => {
      const title = headerElement.querySelector('.model-details__header-title');

      expect(title).toBeTruthy();
      expect(title.textContent).toEqual(MockModel1.name);
    });

    it('has remove button', () => {
      const button = headerElement.querySelector('button');

      expect(button).toBeTruthy();
    });
  });

  describe('versions block', () => {
    let versionsElement: HTMLElement;
    beforeEach(() => {
      versionsElement = element.querySelector('.versions');
    });

    it('exists', () => {
      expect(versionsElement).toBeTruthy();
    });
  });
});
