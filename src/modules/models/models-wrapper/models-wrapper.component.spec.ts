import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsWrapperComponent } from './models-wrapper.component';

describe('ModelsWrapperComponent', () => {
    let component: ModelsWrapperComponent;
    let fixture: ComponentFixture<ModelsWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ModelsWrapperComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelsWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should be created', () => {
    //   expect(component).toBeTruthy();
    // });
});
