import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesHeaderComponent } from './services-header.component';
import { RouterTestingModule } from "@node_modules/@angular/router/testing";
import { IconComponent } from "@shared/components";

describe('ServicesHeaderComponent', () => {
  let component: ServicesHeaderComponent;
  let fixture: ComponentFixture<ServicesHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesHeaderComponent, IconComponent],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
