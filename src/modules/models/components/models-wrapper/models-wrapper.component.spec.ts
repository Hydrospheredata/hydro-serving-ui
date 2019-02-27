import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { MockStoreProvider } from '@testing/mocks';
import { ModelsWrapperComponent } from './models-wrapper.component';

describe('ModelsWrapperComponent', () => {
    let component: ModelsWrapperComponent;
    let fixture: ComponentFixture<ModelsWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModelsWrapperComponent],
            imports: [
                SharedModule,
                RouterTestingModule,
                BrowserAnimationsModule,
            ],
            providers: [
                MockStoreProvider,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelsWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
