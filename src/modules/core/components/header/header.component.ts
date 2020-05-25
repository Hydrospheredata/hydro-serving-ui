import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { BaseHeaderComponent } from '@core/components/header/base-header/base-header.component';
import { TmHeaderComponent } from '@core/components/header/tm-header/tm-header.component';
import { ZenModeService } from '@core/services/zenmode.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
@Component({
  selector: 'hs-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('host', { read: ViewContainerRef }) host: ViewContainerRef;
  isZenMode$: Observable<boolean> = this.zenMode.isZenMode$;

  constructor(
    private zenMode: ZenModeService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      environment.tm ? TmHeaderComponent : BaseHeaderComponent
    );
    this.host.createComponent(factory);
  }
}
