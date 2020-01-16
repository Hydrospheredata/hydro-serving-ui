import { Component } from '@angular/core';
import { ZenModeService } from '@core/services/zenmode.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'hs-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent {
  isZenMode$: Observable<boolean> = this.zenMode.isZenMode$;
  constructor(private zenMode: ZenModeService) {}
}
