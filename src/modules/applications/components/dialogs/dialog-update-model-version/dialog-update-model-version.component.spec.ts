import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationsBuilderService } from '@applications/services';
import { DialogService } from '@dialog/dialog.service';
import { MockStoreProvider, MockSelectedServiceProvider } from '@testing/mocks';
import { DialogUpdateModelVersionComponent } from './dialog-update-model-version.component';

describe('DialogUpdateModelVersionComponent', () => {
    let component: DialogUpdateModelVersionComponent;
    let fixture: ComponentFixture<DialogUpdateModelVersionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogUpdateModelVersionComponent],
            providers: [
                DialogService,
                MockStoreProvider,
                ApplicationsBuilderService,
                MockSelectedServiceProvider,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogUpdateModelVersionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
