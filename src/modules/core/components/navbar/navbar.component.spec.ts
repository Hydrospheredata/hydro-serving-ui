import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { NavbarComponent } from './navbar.component';

fdescribe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavbarComponent],
            imports: [
                SharedModule,
                RouterTestingModule,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should contains logotype', () => {
        const logo = element.querySelector('[hydro-icon]');
        expect(logo).toBeDefined();
    });

    it('shount contains "nav" element', () => {
        const navigationElement = element.querySelector('nav');
        expect(navigationElement).toBeDefined();
    });

    describe('nav element', () => {
        let navigationElement: HTMLElement;
        let navigationItems: HTMLCollection;

        beforeEach(() => {
            navigationElement = element.querySelector('nav');
            navigationItems = navigationElement.children;
        });

        it('should has 2 links', () => {
            expect(navigationItems.length).toBe(2);
        });

        it('first is /models link', () => {
            const modelLink = navigationItems[0];
            expect(modelLink.getAttribute('href')).toBe('/models');
        });

        it('second is /applications link', () => {
            const applicationLink = navigationItems[1];
            expect(applicationLink.getAttribute('href')).toBe('/applications');
        });
    });
});
