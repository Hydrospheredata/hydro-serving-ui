import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlModule } from '@angular-mdl/core';
import { LoaderStateService } from '@core/services';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
    let component: LoaderComponent;
    let fixture: ComponentFixture<LoaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MdlModule,
            ],
            declarations: [LoaderComponent],
            providers: [
                LoaderStateService,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
