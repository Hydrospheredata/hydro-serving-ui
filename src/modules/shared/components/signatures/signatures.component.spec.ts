import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { SignaturesService, LoaderStateService } from '@core/services';
import { SharedModule } from '@shared/shared.module';
import { SignaturesComponent } from './signatures.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '@core/services/http';
import { MockStoreProvider } from '@testing/mocks';

describe('SignaturesComponent', () => {
    let component: SignaturesComponent;
    let fixture: ComponentFixture<SignaturesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                SharedModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
            ],
            providers: [
                HttpService,
                SignaturesService,
                LoaderStateService,
                MockStoreProvider,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignaturesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
