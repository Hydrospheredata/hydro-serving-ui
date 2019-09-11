import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModelsFacade } from '@models/store';
import { MockModel1 } from '@testing/factories/model';
import {
  DialogDeleteModelComponent,
  SELECTED_MODEL,
} from './dialog-delete-model.component';

describe('DialogDeleteModelComponent', () => {
  let fixture: ComponentFixture<DialogDeleteModelComponent>;
  let component: DialogDeleteModelComponent;
  let de: DebugElement;
  let facade: {
    deleteModel: (id: number) => {};
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDeleteModelComponent],
      providers: [
        {
          provide: ModelsFacade,
          useValue: {
            deleteModel: (id: number) => {},
          },
        },
        {
          provide: SELECTED_MODEL,
          useValue: MockModel1,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteModelComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    facade = TestBed.get(ModelsFacade);
    spyOn(facade, 'deleteModel');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('display model name', () => {
    const el: HTMLElement = de.nativeElement;
    const nameElement = el.querySelector('.model-delete__name');
    expect(nameElement).toBeDefined('element doesn\'t exist');
    expect(nameElement.textContent).toContain(MockModel1.name);
  });

  describe('delete button', () => {
    let deleteButton: DebugElement;
    beforeEach(() => {
      deleteButton = de.query(By.css(
        '.model-delete__button'
      ));
    });

    it('exist', () => {
      expect(deleteButton).toBeTruthy();
    });

    it('onClick', () => {
      deleteButton.triggerEventHandler('click', null);

      expect(facade.deleteModel).toHaveBeenCalled();
      expect(facade.deleteModel).toHaveBeenCalledTimes(1);
      expect(facade.deleteModel).toHaveBeenCalledWith(MockModel1.id);
    });
  });
});
