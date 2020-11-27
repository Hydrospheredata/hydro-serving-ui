import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@app/shared/shared.module';
import { HttpClientTestingModule } from '@node_modules/@angular/common/http/testing';
import { getNativeElement } from '@testing/helpers';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
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
    const de = debugElement.query(By.css('.sidebar__message'));

    expect(de).toBeTruthy();
    expect(getNativeElement(de).textContent).toEqual('list is empty');
  });
});
