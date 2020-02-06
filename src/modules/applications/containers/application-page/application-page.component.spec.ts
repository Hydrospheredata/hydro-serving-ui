import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationsFacade } from '@applications/store';
import { SharedModule } from '@shared/shared.module';
import { ApplicationsItemDetailComponent } from '@testing/components';
import { ApplicationPageComponent } from './application-page.component';

const MockApplicationsFacade: Partial<ApplicationsFacade> = {};

describe('ApplicationPageComponent', () => {
  let component: ApplicationPageComponent;
  let fixture: ComponentFixture<ApplicationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ApplicationPageComponent, ApplicationsItemDetailComponent],
      providers: [
        { provide: ApplicationsFacade, useValue: MockApplicationsFacade },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
