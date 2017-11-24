import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModelBuildComponent } from './dialog-model-build.component';
import { FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, InjectionToken, HostListener, Inject } from '@angular/core';
import { MdlDialogReference, MdlDialogService, MdlModule } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { HttpRuntimeTypesService, BuildModelService, ModelsService } from '@shared/services/_index';
import { ModelStatusPipe } from '@shared/pipes/_index';
import { MdlSelectModule } from '@angular-mdl/select';
import { HttpService } from '@shared/services/http.service';
import { SharedModule } from '@shared/shared.module';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';
import { ModelBuilder, ModelRuntimeBuilder } from '@shared/builders/_index';
import { HttpModelServiceService } from '@shared/services/http-model-service.service';
import { injectableModelOptions } from '@components/dialogs/_index';
import { ServicesService } from '@shared/services/_index';
import { Router, ActivatedRoute } from '@angular/router';

describe('DialogModelBuildComponent', () => {
    let component: DialogModelBuildComponent;
    let fixture: ComponentFixture<DialogModelBuildComponent>;
    let modelStub = {
        id: '0'
    };
    let store = {};
    let dialogStub = {};
    let servicesServiceStub = {};
    let routerStub = {};
    const HttpRuntimeTypesServiceStub = {
        getAll() { return []; }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogModelBuildComponent],
            providers: [
                { provide: MdlDialogReference, useValue: dialogStub },
                MdlSnackbarService,
                { provide: injectableModelOptions, useValue: modelStub },
                { provide: Store, useValue: store },
                { provide: ServicesService, useValue: servicesServiceStub },
                { provide: ModelsService, useValue: servicesServiceStub },
                { provide: ModelBuilder, useValue: servicesServiceStub },
                { provide: ModelRuntimeBuilder, useValue: servicesServiceStub },
                { provide: Router, useValue: routerStub },
                { provide: HttpService, useValue: {} },
                { provide: ActivatedRoute, useValue: routerStub },
                { provide: Location, useValue: store },
                { provide: HttpModelServiceService, useValue: store },
                { provide: HttpRuntimeTypesService, useValue: store },

                FormBuilder,
                { provide: FormGroup, useValue: store }

            ],
            imports: [MdlModule, FormsModule, ReactiveFormsModule, MdlSelectModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogModelBuildComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should be created', () => {
    //   expect(component).toBeTruthy();
    // });
});
