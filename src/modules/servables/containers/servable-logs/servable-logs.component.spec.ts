import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServablesService } from '@servables/services';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs';
import { ServableLogsComponent } from './servable-logs.component';

const servableService = {
  getLog() { return of([]); },
};

describe('ServableLogsComponent', () => {
  let component: ServableLogsComponent;
  let fixture: ComponentFixture<ServableLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServableLogsComponent],
      imports: [
        SharedModule,
      ],
      providers: [{ provide: ServablesService, useValue: servableService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServableLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
