import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Application } from '@shared/_index';

@Component({
  selector: 'hs-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent implements OnInit {
  @Input() applications: Application[] = [];
  @Input() favoriteApplications: Application[] = [];
  @Output() toggledFavorite: EventEmitter<Application> = new EventEmitter();
  ngOnInit() {}
  toggleFavorite(application: Application): void {
    event.stopPropagation();
    this.toggledFavorite.emit(application);
  }
}
