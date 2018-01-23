import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeployModelComponent } from './dialog-deploy-model.component';
import { Component, OnInit, InjectionToken, Inject, HostListener } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { MdlSnackbarService, MdlModule } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpModelServiceService } from '@shared/services/http-model-service.service';
import { injectableModelDeployOptions } from '@components/dialogs/_index';
import { ApplicationsService } from '@shared/services/_index';
import { Router, ActivatedRoute } from '@angular/router';

import {
    ModelsService
} from '@shared/_index';

import { Store } from '@ngrx/store';
import { AppState } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';
import { ModelBuilder } from '@shared/builders/_index';
describe('DialogDeployModelComponent', () => {
    let component: DialogDeployModelComponent;
    let fixture: ComponentFixture<DialogDeployModelComponent>;
    let modelStub = {
        id: '0'
    };
    let store = {};
    let dialogStub = {};
    let servicesServiceStub = {};
    let routerStub = {};


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DialogDeployModelComponent ],
            providers: [
                {provide: MdlDialogReference, useValue: dialogStub},
                MdlSnackbarService,
                {provide: injectableModelDeployOptions, useValue: modelStub },
                {provide: Store, useValue: store },
                {provide: ApplicationsService, useValue: servicesServiceStub},
                {provide: ModelsService, useValue: servicesServiceStub},
                {provide: ModelBuilder, useValue: servicesServiceStub},
                {provide: Router, useValue: routerStub},
                {provide: ActivatedRoute, useValue: routerStub},
                {provide: Location, useValue: store},
                {provide: HttpModelServiceService, useValue: store},
                FormBuilder

            ],
            imports: [MdlModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogDeployModelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should be created', () => {
    //   expect(component).toBeTruthy();
    // });
});
