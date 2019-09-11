import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelsFacade } from '@models/store';
import { SharedModule } from '@shared/shared.module';
import { ModelVersionLogComponent } from '@testing/components';
import { ServablesTableComponent } from '@testing/components/mock-servables-table.component';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';
import { of } from 'rxjs';
import { ModelVersionDetailsComponent } from './model-version-details.component';

describe('ModelVersionDetailsComponent', () => {
  let component: ModelVersionDetailsComponent;
  let fixture: ComponentFixture<ModelVersionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModelVersionDetailsComponent,
        ModelVersionLogComponent,
        ServablesTableComponent,
      ],
      imports: [
        SharedModule,
      ],
      providers: [
        {
          provide: ModelsFacade,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVersionDetailsComponent);
    component = fixture.componentInstance;
    component.modelVersion$ = of(MockModelVersion1Model1);
    component.servables$ = of([]);
    fixture.detectChanges();
  });

  it('it should be created', () => {
    expect(component).toBeTruthy();
  });
});
