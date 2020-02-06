import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationStatus, ApplicationStatusComponent } from '@shared/_index';
import { IconComponent } from '../icons/icons.component';

describe('ApplicationStatusComponent', () => {
  let component: ApplicationStatusComponent;
  let fixture: ComponentFixture<ApplicationStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ApplicationStatusComponent, IconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationStatusComponent);
    component = fixture.componentInstance;
    component.status = ApplicationStatus.Ready;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('show success icon', () => {
    const el = fixture.debugElement.nativeElement;
    const statusEl = el.querySelector('.application__status-icon--released');
    expect(statusEl).toBeTruthy();
  });
});
