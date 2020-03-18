import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Application, Model } from '@shared/models';

@Component({
  selector: 'hs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() sidebarData: Application[] | Model[] = [];
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

  get isEmpty(): boolean {
    return this.sidebarData === null || this.sidebarData.length === 0;
  }
}
