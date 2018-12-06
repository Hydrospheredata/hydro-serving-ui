import { DebugElement, Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from '@dialog/component/dialog.component';
import { DialogService } from '@dialog/dialog.service';

import { container } from '@angular/core/src/render3/instructions';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

@Component({
    template: `<span class="test-component"> Im test component <span>`,
})
export class TestComponent {}

describe('Dialog component', () => {
    let fixture: ComponentFixture<DialogComponent>;
    let component: DialogComponent;
    let debugElement: DebugElement;
    let dialogService: DialogService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ NoopAnimationsModule],
            declarations: [DialogComponent],
            providers: [DialogService],
        }).compileComponents();

        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
              declarations: [TestComponent],
              entryComponents: [TestComponent],
            },
          });

        fixture = TestBed.createComponent(DialogComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        dialogService = fixture.debugElement.injector.get(DialogService);

        spyOn(dialogService, 'clearContainer').and.callThrough();

        component.isAnimationDisabled = true;
        fixture.detectChanges();
    }));

    it('should be created', () => {
        expect(component).toBeDefined();
    });

    it('has dialog service', () => {
        expect(dialogService).toBeDefined();
    });

    describe('on initial state', () => {
        let layoutElement: DebugElement;

        beforeEach(() => {
            layoutElement = debugElement.query(By.css('.dialog__layout'));
        });

        it('has layout dom element', () => {
            expect(layoutElement).toBeDefined();
        });

        it('has container dom element', () => {
            const c = layoutElement.query(By.css('.dialog__container'));
            expect(c).toBeTruthy();
        });

        it('layout element is invisible', () => {
            expect(layoutElement.nativeElement.style.display).toBe('none');
        });

        it('containerRef was initialized into dialogService', () => {
            expect(dialogService.viewContainerRef).toBeDefined();
        });

        it('containerRef is empty', () => {
            expect(dialogService.viewContainerRef.length).toBe(0);
        });
    });

    describe('after show modal', () => {
        let layoutElement: DebugElement;

        beforeEach(() => {
            dialogService.createDialog({component: TestComponent});
            fixture.detectChanges();
            layoutElement = debugElement.query(By.css('.dialog__layout'));
        });

        it('layout element is visible', () => {
            expect(layoutElement.nativeElement.style.display).toBe('');
        });

        it('containerRef has 1 component', () => {
            expect(dialogService.viewContainerRef.length).toBe(1);
        });

        it('containerElement contains testComponents html element', () => {
            const containerEl: Element = component.containerElRef.nativeElement;
            expect(containerEl.querySelector('.test-component')).toBeTruthy();
        });

        describe('and after close', () => {
            beforeEach(async(() => {
                dialogService.closeDialog();
                fixture.detectChanges();
            }));

            it('dialogService clearContainer function was called', () => {
                expect(dialogService.clearContainer).toHaveBeenCalled();
            });

            it('containerRef has 1 component', () => {
                expect(dialogService.viewContainerRef.length).toBe(0);
            });

            it('layout element is invisible', () => {
                expect(layoutElement.nativeElement.style.display).toBe('none');
            });
        });
    });
});
