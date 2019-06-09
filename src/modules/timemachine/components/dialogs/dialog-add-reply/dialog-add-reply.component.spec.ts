import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimemachineService } from '@core/services/timemachine.service';
import { DialogService } from '@dialog/dialog.service';
import { StoreModule } from '@ngrx/store';
import { DialogAddReplyComponent } from './dialog-add-reply.component';

const MockTimemachine = {};

describe('DialogAddReplyComponent', () => {
  let component: DialogAddReplyComponent;
  let fixture: ComponentFixture<DialogAddReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddReplyComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MdlSelectModule,
        MdlModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        DialogService,
        { provide: TimemachineService, useValue: MockTimemachine },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
