import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModelsFacade } from '@models/store';
import { SharedModule } from '@shared/shared.module';
import { ModelsHeaderComponent } from '@testing/components';
import { ModelsPageComponent } from './models-page.component';

const modelsFacade: Partial<ModelsFacade> = {};

describe('ModelsPageComponent', () => {
  let component: ModelsPageComponent;
  let fixture: ComponentFixture<ModelsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [ModelsPageComponent, ModelsHeaderComponent],
      providers: [{ provide: ModelsFacade, useValue: modelsFacade }],
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
