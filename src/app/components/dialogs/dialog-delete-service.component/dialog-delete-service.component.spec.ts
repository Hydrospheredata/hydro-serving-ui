import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {InjectionToken, Inject} from '@angular/core';
import { DialogDeleteServiceComponent } from './dialog-delete-service.component';
import { injectableServiceOptions } from '@components/dialogs/_index';
import { Store } from '@ngrx/store';
import { MdlDialogReference, MdlSnackbarService, MdlModule } from '@angular-mdl/core';
import { ServicesService } from '@shared/services/_index';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

describe('DialogDeleteServiceComponent', () => {
  let component: DialogDeleteServiceComponent;
  let fixture: ComponentFixture<DialogDeleteServiceComponent>;
  let modelStub = {
    id: '0'
  };
  let store = {};
  let dialogStub = {};
  let servicesServiceStub = {};
  let routerStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeleteServiceComponent ],
      providers: [
        {provide: MdlDialogReference, useValue: dialogStub},
        MdlSnackbarService,
        {provide: injectableServiceOptions, useValue: modelStub },
        {provide: Store, useValue: store },
        {provide: ServicesService, useValue: servicesServiceStub},
        {provide: Router, useValue: routerStub},
        {provide: ActivatedRoute, useValue: routerStub},
        {provide: Location, useValue: store}

      ],
      imports: [MdlModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
