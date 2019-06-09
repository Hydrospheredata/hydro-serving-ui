import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogService } from '@dialog/dialog.service';
import { TimemachineComponent } from './timemachine.component';

const MockDialog = {};

xdescribe('TimemachineComponent', () => {
  let component: TimemachineComponent;
  let fixture: ComponentFixture<TimemachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimemachineComponent],
      providers: [
        {
          provide: DialogService,
          useValue: MockDialog,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimemachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
