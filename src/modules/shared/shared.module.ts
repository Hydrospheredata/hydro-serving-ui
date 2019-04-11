import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';

import { SelectModule } from 'ng2-select';

// Pipes
import {
    SidebarFilterPipe,
    PositiveNumbersPipe,
    SearchPipe,
    SortByPipe,
    UtcToLocalPipe,
    IterateAsArrayPipe,
    RemoveDublicatesPipe,
    ToNumberPipe,
    MatchSorterPipe,
    DockerImageSplitPipe,
    ReverseArrayPipe,
    FieldShapePipe
} from './pipes/_index';

// Components
import {
    InputTextComponent,
    HydroSelectComponent,
    TextareaComponent,
    SidebarComponent,
    ListInfoComponent,
    SignaturesComponent,
    IconComponent,
    FilterComponent,
    CommandTemplateComponent,
    BaseMetricChartComponent,
    KolmogorovSmirnovChartComponent,
    DialogModelsEmptyComponent,
    ApplicationStatusComponent,
    DialogReqstoreComponent,
    MetadataComponent,
    HealthTimelineComponent,
} from './components/_index';

// Directives
import {
    ModelVersionStatusDirective,
    CopyToBufferDirective,
    BuildInformationDirective,
} from './directives/_index';

const PIPES = [
    SidebarFilterPipe,
    PositiveNumbersPipe,
    SearchPipe,
    SortByPipe,
    UtcToLocalPipe,
    IterateAsArrayPipe,
    RemoveDublicatesPipe,
    ToNumberPipe,
    MatchSorterPipe,
    DockerImageSplitPipe,
    ReverseArrayPipe,
    FieldShapePipe,
];

const COMPONENTS = [
    InputTextComponent,
    TextareaComponent,
    HydroSelectComponent,
    SidebarComponent,
    ListInfoComponent,
    SignaturesComponent,
    IconComponent,
    FilterComponent,
    CommandTemplateComponent,
    BaseMetricChartComponent,
    KolmogorovSmirnovChartComponent,
    DialogModelsEmptyComponent,
    ApplicationStatusComponent,
    DialogReqstoreComponent,
    MetadataComponent,
    HealthTimelineComponent,
];

const DIRECTIVES = [
    ModelVersionStatusDirective,
    CopyToBufferDirective,
    BuildInformationDirective,
];

@NgModule({
    imports: [
        MdlSelectModule,
        BrowserModule,
        CommonModule,
        MdlModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MomentModule,
        SelectModule,
    ],
    declarations: [
        ...PIPES,
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
    entryComponents: [ DialogModelsEmptyComponent, DialogReqstoreComponent ],
    exports: [
        ...PIPES,
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
})
export class SharedModule { }
