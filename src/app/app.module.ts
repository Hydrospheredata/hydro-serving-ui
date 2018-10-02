import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

// Global components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.router';

// Modules
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { ModelsModule } from '@models/models.module';
import { ApplicationsModule } from '@applications/applications.module';
import { ProfilesModule } from '@profiles/profiles.module';

// Dialogs
import * as Dialog from '@components/dialogs/_index';

import {ModelSelectorComponent} from './components/dialogs/dialog-add-application.component/model-selector.component'
import {KafkaStreamingComponent} from '@components/dialogs/dialog-add-application.component/kafka-streaming.component'
import { ApplicationStageComponent } from '@components/dialogs/dialog-add-application.component/application-stage.component'
import { ServiceComponent } from '@components/dialogs/dialog-add-application.component/service.component'


@NgModule({
    declarations: [
        AppComponent,
        Dialog.DialogModelBuildComponent,
        Dialog.DialogTestComponent,
        Dialog.DialogUpdateServiceComponent,
        Dialog.DialogDeleteServiceComponent,
        Dialog.DialogAddApplicationComponent,
        Dialog.DialogAddMetricComponent,
        Dialog.DialogDeleteMetricComponent,
        Dialog.DialogUpdateModelVersionComponent,
        Dialog.DialogDeleteModelComponent,
        Dialog.DialogModelsEmptyComponent,
        ModelSelectorComponent,
        KafkaStreamingComponent,
        ApplicationStageComponent,
        ServiceComponent
    ],
    imports: [
        RouterModule,
        BrowserModule,
        CoreModule,
        ModelsModule,
        ApplicationsModule,
        FormsModule,
        ReactiveFormsModule,
        MomentModule,
        SharedModule,
        ProfilesModule,
        AppRoutingModule
    ],
    entryComponents: [
        Dialog.DialogModelBuildComponent,
        Dialog.DialogTestComponent,
        Dialog.DialogUpdateServiceComponent,
        Dialog.DialogDeleteServiceComponent,
        Dialog.DialogAddApplicationComponent,
        Dialog.DialogAddMetricComponent,
        Dialog.DialogDeleteMetricComponent,
        Dialog.DialogUpdateModelVersionComponent,
        Dialog.DialogDeleteModelComponent,
        Dialog.DialogModelsEmptyComponent,
        ModelSelectorComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
