import { Component, Input, OnDestroy, OnInit, OnChanges } from '@angular/core';
// import { MdlDialogService } from '@angular-mdl/core';
// import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
// import { SortByPipe } from '@shared/pipes/_index';
// import { Subscription } from 'rxjs/Subscription';
// import { Observable } from 'rxjs/Observable';

import { Model, Signature } from '@shared/models/_index';
import { ContractsService } from '@shared/services/_index';




@Component({
    selector: 'hydro-signatures',
    templateUrl: './signatures.component.html',
    styleUrls: ['./signatures.component.scss']
})
export class SignaturesComponent implements OnInit, OnDestroy, OnChanges {

    @Input() data: Model;
    public signatures: Signature[];
    public isReadOnly = false;

    constructor(
        private contractsService: ContractsService,
    ) { }

    ngOnInit() { }

    ngOnChanges() {
        this.contractsService.getModelContracts(this.data.id)
            .subscribe(data => {
                this.signatures = data.signatures;
            });
    }

    ngOnDestroy() { }

}
