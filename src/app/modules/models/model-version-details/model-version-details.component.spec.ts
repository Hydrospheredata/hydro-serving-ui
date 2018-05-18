import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelVersionDetailsComponent } from './model-version-details.component';

describe('ModelVersionDetailsComponent', () => {
    let component: ModelVersionDetailsComponent;
    let fixture: ComponentFixture<ModelVersionDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModelVersionDetailsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelVersionDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('it should be created', () => {
        expect(component).toBeTruthy();
    });

});
