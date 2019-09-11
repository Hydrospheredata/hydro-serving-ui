import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ModelsFacade } from '@models/store';
import { SharedModule } from '@shared/shared.module';
import { MockModel1 } from '@testing/factories/model';
import { of } from 'rxjs';
import { ModelsWrapperComponent } from './models-wrapper.component';

describe('ModelsWrapperComponent', () => {
  let component: ModelsWrapperComponent;
  let fixture: ComponentFixture<ModelsWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelsWrapperComponent],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [
        {
          provide: ModelsFacade,
          useValue: {
            allModels$: of([MockModel1]),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
