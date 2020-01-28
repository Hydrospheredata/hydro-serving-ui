import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { SortByPipe } from '@shared/pipes/_index';
import { Observable } from 'rxjs';

import { Application, Model } from '@shared/models/_index';

@Component({
  selector: 'hs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [SortByPipe],
})
export class SidebarComponent {
  @Input() actionButton: TemplateRef<any>;
  @Input() sidebarData: Observable<Application[] | Model[]>;
  @Input() selectedItem: Application | Model;
  @Output() clicked: EventEmitter<Model | Application> = new EventEmitter();
  @Output() filtered: EventEmitter<string> = new EventEmitter();
  @Output() bookmarked: EventEmitter<Model | Application> = new EventEmitter();

  toggleBookmark(item: Model | Application): void {
    event.stopPropagation();
    this.bookmarked.emit(item);
  }

  handleFilter(filterString: string): void {
    this.filtered.next(filterString);
  }

  handleClick(item: Model | Application): void {
    this.clicked.emit(item);
  }
}
