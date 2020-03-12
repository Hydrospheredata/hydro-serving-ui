import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegimeSelectorComponent } from './regime-selector.component';

describe('RegimeSelectorComponent', () => {
  let component: RegimeSelectorComponent;
  let fixture: ComponentFixture<RegimeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegimeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegimeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
