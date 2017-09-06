import { NgModule } from "@angular/core";

import { ModelStatusPipe, PositiveNumbersPipe, SearchPipe, SortByPipe, UtcToLocalPipe } from "./pipes/_index";


@NgModule({
    imports: [],
    declarations: [
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe
    ],
    providers: [],
    exports: [
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe
    ]
})
export class SharedModule { }
