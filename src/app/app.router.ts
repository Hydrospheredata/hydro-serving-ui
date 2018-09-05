import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComnonent } from '@core/components/page-not-found/page-not-found.component'

const routes: Routes = [
    { path: '**', component: PageNotFoundComnonent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
