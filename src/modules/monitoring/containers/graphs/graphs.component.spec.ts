import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';
import { ChartComponent } from '@testing/components';
import { GraphsComponent } from './graphs.component';

xdescribe('GraphsComponent', () => {
  let component: GraphsComponent;
  let fixture: ComponentFixture<GraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphsComponent, ChartComponent],
      imports: [
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
