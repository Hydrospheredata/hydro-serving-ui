import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcesWrapperComponent } from './sources-wrapper.component';

describe('SourcesWrapperComponent', () => {
    let component: SourcesWrapperComponent;
    let fixture: ComponentFixture<SourcesWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SourcesWrapperComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SourcesWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
