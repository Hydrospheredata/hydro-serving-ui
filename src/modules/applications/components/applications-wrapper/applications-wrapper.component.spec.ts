import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsWrapperComponent } from './applications-wrapper.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from '@dialog/dialog.service';
import { SharedModule } from '@shared/shared.module';
import { MockStoreProvider } from '@testing/mocks';

describe('ApplicationsWrapperComponent', () => {
    let component: ApplicationsWrapperComponent;
    let fixture: ComponentFixture<ApplicationsWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ApplicationsWrapperComponent,
            ],
            imports: [
                SharedModule,
                RouterTestingModule,
                NoopAnimationsModule,
            ],
            providers: [
                MockStoreProvider,
                DialogService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationsWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
