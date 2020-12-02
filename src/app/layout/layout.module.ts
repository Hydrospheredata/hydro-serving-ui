import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderInfoComponent } from '@app/layout/header-info/header-info.component';
import { HeaderNavComponent } from '@app/layout/header-nav/header-nav.component';
import { SharedModule } from '@app/shared/shared.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  exports: [HeaderComponent, PageNotFoundComponent],
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
    HeaderNavComponent,
    HeaderInfoComponent,
  ],
  imports: [SharedModule, RouterModule],
})
export class LayoutModule {}
