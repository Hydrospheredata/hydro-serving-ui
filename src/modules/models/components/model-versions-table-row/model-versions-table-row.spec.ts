import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModelVersionsTableRowComponent } from '@models/components';
import { ModelVersionStatus, UtcToLocalPipe } from '@shared/_index';
import { SharedModule } from '@shared/shared.module';
import {
    MockModelVersion1Model1,
    MockModelVersion2Model1,
    FailedModelVersion,
    AssemblingModelVersion
} from '@testing/factories/modelVersion';
import { MomentModule, TimeAgoPipe } from 'angular2-moment';

fdescribe('ModelVersionTableRow component', () => {
    let fixture: ComponentFixture<ModelVersionsTableRowComponent>;
    let component: ModelVersionsTableRowComponent;
    let element: Element;

    beforeEach(() => {
        TestBed.configureTestingModule(
            {
                declarations: [ModelVersionsTableRowComponent],
                imports: [
                    SharedModule,
                    MomentModule,
                    RouterTestingModule,
                ],
            }
        ).compileComponents();

        fixture = TestBed.createComponent(ModelVersionsTableRowComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('with FAILED model version', () => {
        beforeEach(() => {
            component.modelVersion = FailedModelVersion;
            fixture.detectChanges();
        });

        it('shows right model version status', () => {
            const statusElement = element.querySelector('.model-version-status');
            expect(statusElement.textContent).toEqual(ModelVersionStatus.Failed);
        });

        it('does NOT show actions', () => {
            const actionsElement = element.querySelector('.model-version__actions');
            expect(actionsElement).toBeFalsy();
        });
    });

    describe('with ASSEMBLING model version', () => {
        beforeEach(() => {
            component.modelVersion = AssemblingModelVersion;
            fixture.detectChanges();
        });

        it('shows right model version status', () => {
            const statusElement = element.querySelector('.model-version-status');
            expect(statusElement.textContent).toEqual(ModelVersionStatus.Assembling);
        });

        it('does NOT show actions', () => {
            const actionsElement = element.querySelector('.model-version__actions');
            expect(actionsElement).toBeFalsy();
        });
    });

    describe('with finished model version', () => {
        beforeEach(() => {
            component.modelVersion = MockModelVersion1Model1;
            fixture.detectChanges();
        });

        it('shows model version', () => {
            const modelVersionElement = element.querySelector('.model-version__model-version');
            const mV = `${MockModelVersion1Model1.modelVersion}`;
            expect(modelVersionElement.textContent).toContain(mV);
        });

        it('shows right model version status', () => {
            const statusElement = element.querySelector('.model-version-status');
            expect(statusElement.textContent).toEqual(ModelVersionStatus.Released);
        });

        it('shows created time in timeAgo format', () => {
            const createdTimeElement = element.querySelector('.model-version__created-time');
            const utcToLocalPipe = new UtcToLocalPipe();
            const timeAgo = new TimeAgoPipe(fixture.changeDetectorRef, fixture.ngZone);

            const pipedTime = timeAgo.transform(
                utcToLocalPipe.transform(
                    MockModelVersion1Model1.created
                )
            );

            expect(createdTimeElement).toBeTruthy();
            expect(createdTimeElement.textContent).toBe(pipedTime);
        });

        it('show actions', () => {
            const actionsElement = element.querySelector('.model-version__actions');

            expect(actionsElement).toBeTruthy();
        });

        describe('without applications', () => {
            it('shows dash', () => {
                const applicationsElement = element.querySelector('.model-version__applications');
                expect(applicationsElement).toBeTruthy();
                expect(applicationsElement.textContent).toBe('-');
            });
        });
    });

    describe('model version with applications', () => {
        beforeEach(() => {
            component.modelVersion = MockModelVersion2Model1;
            fixture.detectChanges();
        });

        it('shows applications names through semilicon', () => {
            const applicationsElement = element.querySelector('.model-version__applications');
            const applications = MockModelVersion2Model1.applications.join(', ');

            expect(applicationsElement).toBeTruthy();
            expect(applicationsElement.textContent).toBe(applications);
        });
    });
});
