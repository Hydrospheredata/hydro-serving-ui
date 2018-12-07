import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from '@dialog/dialog.service';
import { SharedModule } from '@shared/shared.module';
import { MockStoreProvider } from '@testing/mocks';
import { MomentModule } from 'angular2-moment';
import { ModelDetailsComponent } from './model-details.component';

describe('ModelDetailsComponent', () => {
    let component: ModelDetailsComponent;
    let fixture: ComponentFixture<ModelDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ModelDetailsComponent,
            ],
            imports: [
                SharedModule,
                MomentModule,
                RouterTestingModule,
            ],
            providers: [
                MockStoreProvider,
                DialogService,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('it should be created', () => {
        expect(component).toBeTruthy();
    });

});
