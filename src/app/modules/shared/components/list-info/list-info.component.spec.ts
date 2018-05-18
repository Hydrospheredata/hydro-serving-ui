import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInfoComponent } from './list-info.component';

describe('ListInfoComponent', () => {
    let component: ListInfoComponent;
    let fixture: ComponentFixture<ListInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListInfoComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
