import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTriggerComponent } from './menu-trigger.component';

describe('MenuTriggerComponent', () => {
  let component: MenuTriggerComponent;
  let fixture: ComponentFixture<MenuTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuTriggerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
