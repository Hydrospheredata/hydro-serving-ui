import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ApplicationsItemDetailComponent } from './applications-item-detail.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationsFacade } from '@applications/store';
import { DialogService } from '@dialog/dialog.service';
import { UpdateModelVersionDirective } from '@testing/directives/test-update-model-version.directive';
import { MockApplication } from '@testing/factories/application';
import { of } from 'rxjs';

const applicationsFacadeMock = {};
describe('ApplicationsItemDetailComponent', () => {
  let component: ApplicationsItemDetailComponent;
  let fixture: ComponentFixture<ApplicationsItemDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ApplicationsItemDetailComponent,
        UpdateModelVersionDirective,
      ],
      imports: [
        SharedModule,
        RouterModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        DialogService,
        {
          provide: ApplicationsFacade,
          useValue: applicationsFacadeMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsItemDetailComponent);
    component = fixture.componentInstance;
    component.application$ = of(MockApplication);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
