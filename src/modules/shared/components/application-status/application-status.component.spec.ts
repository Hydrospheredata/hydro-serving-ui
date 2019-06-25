import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationStatus, ApplicationStatusComponent } from '@shared/_index';
import { MockApplication } from '@testing/factories/application';

describe('ApplicationsItemDetailComponent', () => {
  let component: ApplicationStatusComponent;
  let fixture: ComponentFixture<ApplicationStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationStatusComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationStatusComponent);
    component = fixture.componentInstance;
    component.application = MockApplication;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('contains status text', () => {
    const el = fixture.debugElement.nativeElement;
    const statusEl = el.querySelector('.status');

    expect(statusEl).toBeDefined();
    expect(statusEl.innerText).toEqual(ApplicationStatus.Ready);
  });
});
