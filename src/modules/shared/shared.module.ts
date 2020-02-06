import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';

// Pipes
import {
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
  FormatDatePipe
} from './pipes/_index';

// Components
import {
  InputTextComponent,
  HydroSelectComponent,
  TextareaComponent,
  SidebarComponent,
  ListInfoComponent,
  IconComponent,
  FilterComponent,
  CommandTemplateComponent,
  ApplicationStatusComponent,
  MetadataComponent,
  TensorImageListComponent,
  AlertMessageComponent,
  LogsComponent,
  ButtonComponent,
  TooltipComponent,
  ExpanderComponent,
  ProbabilitiesListComponent,
  LoaderComponent,
} from './components/_index';

// Directives
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HsD3Module } from '../hs-d3/hs-d3.module';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import {
  CopyToBufferDirective,
  BuildInformationDirective,
  PixelToCanvasDirective,
  AutofocusedDirective,
  ScaleImageDirective,
  HideInZenModeDirective,
} from './directives/_index';

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
  declarations: [
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  exports: [...PIPES, ...COMPONENTS, ...DIRECTIVES, ...RE_EXPORTED_MODULES],
})
export class SharedModule {}
