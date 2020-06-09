import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Directives
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';
import { HsD3Module } from '../hs-d3/hs-d3.module';
// Components
import {
  AlertMessageComponent,
  ApplicationStatusComponent,
  ButtonComponent,
  CommandTemplateComponent,
  ExpanderComponent,
  FilterComponent,
  HydroSelectComponent,
  IconComponent,
  InputTextComponent,
  ListInfoComponent,
  LoaderComponent,
  LogsComponent,
  MetadataComponent,
  ProbabilitiesListComponent,
  SidebarComponent,
  TensorImageListComponent,
  TextareaComponent,
  TooltipComponent,
  ServiceAvailabilityComponent,
  LoadingComponent,
} from './components';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import {
  AutofocusedDirective,
  BuildInformationDirective,
  CopyToBufferDirective,
  HideInZenModeDirective,
  PixelToCanvasDirective,
  ScaleImageDirective,
} from './directives/_index';
// Pipes
import {
  DockerImageSplitPipe,
  FieldShapePipe,
  FormatDatePipe,
  IterateAsArrayPipe,
  MatchSorterPipe,
  PositiveNumbersPipe,
  ReverseArrayPipe,
  SearchPipe,
  SidebarFilterPipe,
  SortByPipe,
  TimeAgoPipe,
  ToNumberPipe,
} from './pipes';
import { PluckPipe } from './pipes/pluck.pipe';

const PIPES = [
  SidebarFilterPipe,
  PositiveNumbersPipe,
  SearchPipe,
  SortByPipe,
  IterateAsArrayPipe,
  ToNumberPipe,
  MatchSorterPipe,
  DockerImageSplitPipe,
  ReverseArrayPipe,
  FieldShapePipe,
  TimeAgoPipe,
  FormatDatePipe,
];

const COMPONENTS = [
  InputTextComponent,
  TextareaComponent,
  HydroSelectComponent,
  SidebarComponent,
  ListInfoComponent,
  IconComponent,
  FilterComponent,
  CommandTemplateComponent,
  ApplicationStatusComponent,
  MetadataComponent,
  TensorImageListComponent,
  AlertMessageComponent,
  ErrorMessageComponent,
  LogsComponent,
  ButtonComponent,
  TooltipComponent,
  ExpanderComponent,
  ProbabilitiesListComponent,
  LoaderComponent,
  ServiceAvailabilityComponent,
  LoadingComponent,
];

const DIRECTIVES = [
  CopyToBufferDirective,
  BuildInformationDirective,
  PixelToCanvasDirective,
  AutofocusedDirective,
  ScaleImageDirective,
  HideInZenModeDirective,
];

const RE_EXPORTED_MODULES = [
  MdlSelectModule,
  MdlModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  SelectModule,
  HsD3Module,
  BrowserAnimationsModule,
];

@NgModule({
  imports: [...RE_EXPORTED_MODULES],
  declarations: [...PIPES, ...COMPONENTS, ...DIRECTIVES, PluckPipe],
  exports: [
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...RE_EXPORTED_MODULES,
    PluckPipe,
  ],
})
export class SharedModule {}
