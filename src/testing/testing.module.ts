import { NgModule } from '@angular/core';
import { ModelVersionsTableComponent } from '@testing/components';
import { ProfilesComponent } from '@testing/components/mock-profiles';

const COMPONENTS = [
    ProfilesComponent,
    ModelVersionsTableComponent,
];

@NgModule({
    declarations: [
        ...COMPONENTS,
    ],
    exports: [
        ...COMPONENTS,
    ],
})
export class TestingModule {}
