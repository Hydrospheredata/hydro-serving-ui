import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcesItemDetailComponent } from './sources-item-detail.component';

describe('SourcesItemDetailComponent', () => {
    let component: SourcesItemDetailComponent;
    let fixture: ComponentFixture<SourcesItemDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SourcesItemDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SourcesItemDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
