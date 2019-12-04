import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { ModelVersionDetailsContainerComponent } from './model-version-details-container.component';

describe('ModelVersionDetailsContainerComponent', () => {
  let component: ModelVersionDetailsContainerComponent;
  let fixture: ComponentFixture<ModelVersionDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelVersionDetailsContainerComponent],
      imports: [RouterTestingModule, SharedModule],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVersionDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
