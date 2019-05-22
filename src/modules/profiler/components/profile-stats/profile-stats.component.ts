import { Component, Input } from '@angular/core';
import { DoubleProfile } from '@shared/models/_index';

@Component({
  selector: 'hs-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrls: ['./profile-stats.component.scss'],
})
export class ProfileStatsComponent {
  @Input() profile: DoubleProfile | null;
}
