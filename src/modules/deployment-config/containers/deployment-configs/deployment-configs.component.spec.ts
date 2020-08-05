import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentConfigsComponent } from './deployment-configs.component';

describe('DeploymentConfigsComponent', () => {
  let component: DeploymentConfigsComponent;
  let fixture: ComponentFixture<DeploymentConfigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploymentConfigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
