import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDetailsSummaryComponent } from './model-details-summary.component';

describe('ModelDetailsSummaryComponent', () => {
  let component: ModelDetailsSummaryComponent;
  let fixture: ComponentFixture<ModelDetailsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelDetailsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDetailsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
