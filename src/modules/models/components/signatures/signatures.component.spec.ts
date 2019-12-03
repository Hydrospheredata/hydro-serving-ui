import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelsFacade } from '@models/store';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs';
import { SignaturesComponent } from './signatures.component';

const mockModelsFacade = {
  signature$: of(),
};

describe('SignaturesComponent', () => {
  let component: SignaturesComponent;
  let fixture: ComponentFixture<SignaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignaturesComponent],
      imports: [SharedModule],
      providers: [ {
        provide: ModelsFacade,
        useValue: mockModelsFacade,
      }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
