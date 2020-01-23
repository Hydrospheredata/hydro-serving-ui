import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsPageComponent } from './models-page.component';

describe('ModelsPageComponent', () => {
  let component: ModelsPageComponent;
  let fixture: ComponentFixture<ModelsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelsPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
