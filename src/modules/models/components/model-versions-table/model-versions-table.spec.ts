import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
    ModelVersionsTableRowComponent
} from '@models/components/model-versions-table-row/model-versions-table-row.component';
import { ModelVersionsTableComponent } from '@models/components/model-versions-table/model-versions-table.component';
import { SharedModule } from '@shared/shared.module';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';
import { MomentModule } from 'angular2-moment';

describe('Model version table', () => {
    let fixture: ComponentFixture<ModelVersionsTableComponent>;
    let component: ModelVersionsTableComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ModelVersionsTableComponent,
                ModelVersionsTableRowComponent,
            ],
            imports: [
                SharedModule,
                MomentModule,
                RouterTestingModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelVersionsTableComponent);
        component = fixture.componentInstance;
    });

    it ('should be created', () => {
        expect(component).toBeDefined();
    });

    describe('with empty list', () => {
        beforeEach(() => {
            component.modelVersions = [];
            fixture.detectChanges();
        });

        it('shows error message', () => {
            const errorElement = fixture.nativeElement.querySelector('.alert');
            expect(errorElement).toBeTruthy();
            expect(errorElement.textContent).toContain('Ooops');
        });
    });

    describe('with NOT empty list', () => {
        beforeEach(() => {
            component.modelVersions = [MockModelVersion1Model1];
            fixture.detectChanges();
        });

        it('doesnt show error message', () => {
            const errorElement = fixture.nativeElement.querySelector('.alert');
            expect(errorElement).toBeFalsy();
        });
    });
});
