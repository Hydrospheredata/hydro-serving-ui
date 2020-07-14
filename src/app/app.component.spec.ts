import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { HydroConfigService } from '@core/services/hydro-config.service';

import { AppComponent } from './app.component';

import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app.router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ApplicationsModule } from '@applications/applications.module';
import { CoreModule } from '@core/core.module';
import { DialogModule } from '@dialog/dialog.module';
import { ModelsModule } from '@models/models.module';
import { Store } from '@ngrx/store';
import { ProfilerModule } from '@profiler/profiler.module';
import { VisualizationModule } from '../modules/visualization/visualization.module';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        ModelsModule,
        ApplicationsModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        ProfilerModule,
        AppRoutingModule,
        DialogModule,
        VisualizationModule,
      ],
      providers: [
        Store,
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: HydroConfigService,
          useValue: {
            config: {},
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
