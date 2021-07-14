import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplanationButtonComponent } from './explanation-button.component';

describe('ExplanationButtonComponent', () => {
  let component: ExplanationButtonComponent;
  let fixture: ComponentFixture<ExplanationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExplanationButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplanationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
