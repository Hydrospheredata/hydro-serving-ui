import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsHeaderZenModeComponent } from './models-header-zen-mode.component';

describe('ModelsHeaderZenModeComponent', () => {
  let component: ModelsHeaderZenModeComponent;
  let fixture: ComponentFixture<ModelsHeaderZenModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsHeaderZenModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsHeaderZenModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
