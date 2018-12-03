import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '@shared/shared.module';
import { ModelDetailsComponent } from './model-details.component';

describe('ModelDetailsComponent', () => {
    let component: ModelDetailsComponent;
    let fixture: ComponentFixture<ModelDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModelDetailsComponent],
            imports: [
                SharedModule,
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
