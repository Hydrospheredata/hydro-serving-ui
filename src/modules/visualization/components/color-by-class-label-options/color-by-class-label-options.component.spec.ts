import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorByClassLabelOptionsComponent } from './color-by-class-label-options.component';

describe('ColorByClassLabelOptionsComponent', () => {
  let component: ColorByClassLabelOptionsComponent;
  let fixture: ComponentFixture<ColorByClassLabelOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorByClassLabelOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorByClassLabelOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
