import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng5SliderModule } from 'ng5-slider';
import * as P from './pipes';
import * as C from './components';
import * as D from './directives';

const reExportedModules = [
  Ng5SliderModule,
  MdlSelectModule,
  MdlModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
];

const pipes = [
  P.FormatDatePipe,
  P.IterateAsArrayPipe,
  P.MatchSorterPipe,
  P.PluckPipe,
  P.SortByPipe,
  P.TimeAgoPipe,
  P.FieldShapePipe,
  P.MappedServablePipe,
];

const directives = [
  D.BuildInformationDirective,
  D.CopyToBufferDirective,
  D.AutofocusedDirective,
  D.HideInZenModeDirective,
  D.ShowInZenModeDirective,
  D.ScaleImageDirective,
  D.PixelToCanvasDirective,
  D.TippyDirective,
];

const components = [
  C.SidebarComponent,
  C.InputTextComponent,
  C.IconComponent,
  C.ApplicationStatusComponent,
  C.ErrorMessageComponent,
  C.ModelVersionStatusComponent,
  C.CommandTemplateComponent,
  C.LogsComponent,
  C.ButtonComponent,
  C.TooltipComponent,
  C.LoaderComponent,
  C.LoadingComponent,
  C.TensorImageListComponent,
  C.ServiceAvailabilityComponent,
  C.AlertMessageComponent,
  C.LogComponent,
];

@NgModule({
  declarations: [...pipes, ...components, ...directives],
  imports: [...reExportedModules],
  exports: [...reExportedModules, ...components, ...pipes, ...directives],
})
export class SharedModule {}
