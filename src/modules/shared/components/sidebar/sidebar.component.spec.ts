import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { SidebarComponent } from './sidebar.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { getNativeElement } from '@testing/helpers';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    component.sidebarData = [];
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('show message if data is empty', () => {
    let de = debugElement.query(By.css('.sidebar__message'))

    expect(de).toBeTruthy();
    expect(getNativeElement(de).textContent).toEqual('list is empty')
  });
});
