import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlTabsModule } from '@angular-mdl/core';
import { FormsModule } from '@angular/forms';
import { DialogService } from '@dialog/dialog.service';
import { SharedModule } from '@shared/shared.module';
import { MockStoreProvider, MockSelectedApplication } from '@testing/mocks';
import { CodemirrorModule } from 'ng2-codemirror';
import { DialogTestComponent } from './dialog-test.component';

describe('DialogTestComponent', () => {
    let component: DialogTestComponent;
    let fixture: ComponentFixture<DialogTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                MdlTabsModule,
                CodemirrorModule,
                FormsModule,
            ],
            declarations: [
                DialogTestComponent,
            ],
            providers: [
                DialogService,
                MockStoreProvider,
                MockSelectedApplication,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
