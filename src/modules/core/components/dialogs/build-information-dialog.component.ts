import { Component } from '@angular/core';
import { BuildInformationService } from '@core/services/build-information.service';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './build-information-dialog.component.html',
    styleUrls: ['./build-information-dialog.component.scss'],
})
export class BuildInformationDialogComponent {
    buildInfo$: Observable<any>;
    constructor(
        buildInfo: BuildInformationService
    ) {
        this.buildInfo$ = buildInfo.getBuildInformation();
     }
}
