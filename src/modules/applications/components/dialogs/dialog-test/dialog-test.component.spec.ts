import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlTabsModule } from '@angular-mdl/core';
import { Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApplicationsFacade } from '@applications/store';
import { DialogService } from '@dialog/dialog.service';
import { SharedModule } from '@shared/shared.module';
import { MockSelectedApplication } from '@testing/mocks';
import { CodemirrorModule } from 'ng2-codemirror';
import { of } from 'rxjs';
import { DialogTestComponent } from './dialog-test.component';

const applicationFacadeProvider: Provider = {
  provide: ApplicationsFacade,
  useValue: {
    testingDialogState$: of({}),
    clearTestingDialog: () => {},
    generateInput: () => {},
  },
};

describe('DialogTestComponent', () => {
  let component: DialogTestComponent;
  let fixture: ComponentFixture<DialogTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, MdlTabsModule, CodemirrorModule, FormsModule],
      declarations: [DialogTestComponent],
      providers: [
        DialogService,
        MockSelectedApplication,
        applicationFacadeProvider,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
