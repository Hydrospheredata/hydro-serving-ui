import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSignatureComponent } from './application-signature.component';

describe('ApplicationSignatureComponent', () => {
  let component: ApplicationSignatureComponent;
  let fixture: ComponentFixture<ApplicationSignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationSignatureComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
