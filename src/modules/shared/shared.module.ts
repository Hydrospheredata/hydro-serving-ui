import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MomentPipe,
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
  ApplicationStatusComponent,
  MetadataComponent,
  TensorImageListComponent,
  AlertMessageComponent,
  LogsComponent,
  ButtonComponent,
  TooltipComponent,
  ExpanderComponent,
  ProbabilitiesListComponent,
} from './components/_index';

// Directives
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HsD3Module } from '../hs-d3/hs-d3.module';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import {
  ModelVersionStatusDirective,
  CopyToBufferDirective,
  BuildInformationDirective,
  PixelToCanvasDirective,
  AutofocusedDirective,
  ScaleImageDirective,
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
];

const DIRECTIVES = [
  ModelVersionStatusDirective,
  CopyToBufferDirective,
  BuildInformationDirective,
  PixelToCanvasDirective,
  AutofocusedDirective,
  ScaleImageDirective,
];

const RE_EXPORTED_MODULES = [
  MdlSelectModule,
  MdlModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  MomentModule,
  SelectModule,
  HsD3Module,
  BrowserAnimationsModule,
];

@NgModule({
  imports: [...RE_EXPORTED_MODULES],
  declarations: [...PIPES, ...COMPONENTS, ...DIRECTIVES, ScaleImageDirective],
  exports: [...PIPES, ...COMPONENTS, ...DIRECTIVES, ...RE_EXPORTED_MODULES],
})
export class SharedModule {}
