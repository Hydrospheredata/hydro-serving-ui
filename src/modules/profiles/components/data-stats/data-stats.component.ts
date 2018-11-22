import { Component, Input } from '@angular/core';
import { DoubleProfile } from '@shared/models/_index';
@Component({
  selector: 'hydro-data-stats',
  templateUrl: './data-stats.component.html',
  styleUrls: ['./data-stats.component.scss'],
})
export class DataStatsComponent {
  @Input() profile: DoubleProfile | null;
}
