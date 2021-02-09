import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcEditComponent } from './dc-edit.component';

describe('DcEditComponent', () => {
  let component: DcEditComponent;
  let fixture: ComponentFixture<DcEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
