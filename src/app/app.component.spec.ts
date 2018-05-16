import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { SharedModule } from '../modules/shared/shared.module';

import { AppRoutingModule } from './app.router';
import { MdlModule } from '@angular-mdl/core';
import { APP_BASE_HREF } from '@angular/common';
import { NavbarComponent, LoaderComponent } from '@core/_index';
import { Store } from '@ngrx/store';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                NavbarComponent,
                LoaderComponent
            ],
            imports: [
                SharedModule,
                AppRoutingModule,
                MdlModule
            ],
            providers: [
                Store,
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

});
