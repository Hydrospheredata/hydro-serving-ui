import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import * as P from './pipes';
import * as C from './components';
import * as D from './directives';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

const reExportedModules = [
  NgxSliderModule,
  MdlSelectModule,
  MdlModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NotifierModule,
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
  imports: [
    ...reExportedModules,
    NotifierModule.withConfig(customNotifierOptions),
  ],
  exports: [...reExportedModules, ...components, ...pipes, ...directives],
})
export class SharedModule {}
