import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from '@dialog/dialog.service';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs';
import { ModelVersionsTagsComponent } from './model-versions-tags.component';
import { ModelVersionsTagsFacade } from './model-versions-tags.facade';

describe('ModelVersionsTagsComponent', () => {
  let component: ModelVersionsTagsComponent;
  let fixture: ComponentFixture<ModelVersionsTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ModelVersionsTagsComponent],
      providers: [
        {
          provide: DialogService,
          useValue: {},
        },
      ],
    })
      .overrideComponent(ModelVersionsTagsComponent, {
        set: {
          providers: [
            {
              provide: ModelVersionsTagsFacade,
              useValue: {
                modelVersions$: of([]),
              },
            },
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVersionsTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
