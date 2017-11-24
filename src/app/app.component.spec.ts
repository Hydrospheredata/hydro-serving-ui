import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { SharedModule } from '../modules/shared/shared.module';
import {
    LoaderComponent,
    NavbarComponent
} from '@shared/_index';

import { HydroRouter } from '@app/app.router';
import { MdlModule } from '@angular-mdl/core';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                LoaderComponent,
                NavbarComponent
            ],
            imports: [
                SharedModule,
                HydroRouter,
                MdlModule
            ],
            providers: [{provide: APP_BASE_HREF, useValue : '/' }]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should have as title \'app\'', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('HydroServingUi');
    }));

    // it('should render title in a h1 tag', async(() => {
    //   const fixture = TestBed.createComponent(AppComponent);
    //   fixture.detectChanges();
    //   const compiled = fixture.debugElement.nativeElement;
    //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
    // }));
});
