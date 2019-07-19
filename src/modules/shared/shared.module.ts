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
    FieldShapePipe,
    MomentPipe
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
    MetadataComponent,
    PredictRequestComponent,
    PredictResponseComponent,
    TensorImageListComponent,
    AlertMessageComponent,
    LogsComponent,
    ButtonComponent,
    TooltipComponent,
    ExpanderComponent,
} from './components/_index';

// Directives
import { HsD3Module } from '../hs-d3/hs-d3.module';
import {
    ErrorMessageComponent
} from './components/error-message/error-message.component';
import {
    ModelVersionStatusDirective,
    CopyToBufferDirective,
    BuildInformationDirective,
    PixelToCanvasDirective,
    ExpandableDirective,
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
    MomentPipe,
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
    MetadataComponent,
    PredictRequestComponent,
    PredictResponseComponent,
    TensorImageListComponent,
    AlertMessageComponent,
    ErrorMessageComponent,
    LogsComponent,
    ButtonComponent,
    TooltipComponent,
    ExpanderComponent,
];

const DIRECTIVES = [
    ModelVersionStatusDirective,
    CopyToBufferDirective,
    BuildInformationDirective,
    PixelToCanvasDirective,
    ExpandableDirective,
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
        HsD3Module,
    ],
    declarations: [
        ...PIPES,
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
    entryComponents: [ DialogModelsEmptyComponent ],
    exports: [
        ...PIPES,
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
})
export class SharedModule { }
