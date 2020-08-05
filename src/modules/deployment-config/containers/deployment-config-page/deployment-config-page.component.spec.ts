import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentConfigPageComponent } from './deployment-config-page.component';

describe('DeploymentConfigPageComponent', () => {
  let component: DeploymentConfigPageComponent;
  let fixture: ComponentFixture<DeploymentConfigPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploymentConfigPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentConfigPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
