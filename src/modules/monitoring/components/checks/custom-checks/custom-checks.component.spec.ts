import { DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { CustomCheckComponent } from '@testing/components';
import { CustomChecksComponent } from './custom-checks.component';

describe('CustomChecks component', () => {
  let component: CustomChecksComponent;
  let fixture: ComponentFixture<CustomChecksComponent>;
  let de: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomChecksComponent, CustomCheckComponent],
      imports: [SharedModule],
    })
      .overrideComponent(CustomChecksComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomChecksComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('with empty custom metrics list', () => {
    it('shows user friendly message', () => {
      const message = de.query(By.css('.custom-checks__alert'));
      expect(message).toBeTruthy();
      expect((message.nativeElement as HTMLElement).textContent).toContain(
        'Custom metric list is empty'
      );
    });

    it('shows call to action button', () => {
      const button = de.query(By.css('.custom-checks__button'));
      expect(button).toBeTruthy();
      expect((button.nativeElement as HTMLElement).textContent).toContain(
        'Add metric'
      );
    });
  });
  describe('with not empty custom metrics list', () => {
    beforeEach(() => {
      component.customChecks = [{ name: 'custom', data: [], threshold: 0 }];
      fixture.detectChanges();
    });

    it('shows header element', () => {
      const headerDebugElement = de.query(By.css('header'));
      expect(headerDebugElement.nativeElement).toBeTruthy();
    });

    it('shows call to action button', () => {
      const button = de.query(By.css('.custom-checks__button'));
      expect(button).toBeTruthy();
      expect((button.nativeElement as HTMLElement).textContent).toContain(
        'metric settings'
      );
    });
  });
});
