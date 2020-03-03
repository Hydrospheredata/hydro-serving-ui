import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBySelectorComponent } from './color-by-selector.component';

describe('ColorBySelectorComponent', () => {
  let component: ColorBySelectorComponent;
  let fixture: ComponentFixture<ColorBySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorBySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorBySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
