import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelsHeaderService } from '@models/components/models-header/models-header.service';
import { Observable, of } from '@node_modules/rxjs';
import { Model, ModelVersion } from '@shared/models';
import { SharedModule } from '@shared/shared.module';
import { MockModel1 } from '@testing/factories/model';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';
import { ModelsHeaderComponent } from './models-header.component';

describe('ModelsHeaderComponent', () => {
  let component: ModelsHeaderComponent;
  let fixture: ComponentFixture<ModelsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ModelsHeaderComponent],
    })
      .overrideComponent(ModelsHeaderComponent, {
        add: {
          providers: [
            {
              provide: ModelsHeaderService,
              useValue: getMockedModelsHeaderService(),
            },
          ],
        },
      })
      .compileComponents()
      .then();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function getMockedModelsHeaderService(): Partial<ModelsHeaderService> {
  return {
    isButtonShowed(): Observable<boolean> {
      return of(true);
    },
    getModel(): Observable<Model> {
      return of(MockModel1);
    },
    getSiblings(): Observable<ModelVersion[]> {
      return of([]);
    },
    getModelVersion(): Observable<ModelVersion> {
      return of(MockModelVersion1Model1);
    },
    getService(): Observable<string> {
      return of();
    },
  };
}
