import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsWrapperComponent } from './applications-wrapper.component';
import { SidebarComponent } from '@modules/shared/_index';

describe('ApplicationsWrapperComponent', () => {
    let component: ApplicationsWrapperComponent;
    let fixture: ComponentFixture<ApplicationsWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ApplicationsWrapperComponent,
                SidebarComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationsWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
