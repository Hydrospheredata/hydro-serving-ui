import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SortByPipe } from '@shared/pipes/_index';
import { Subscription, Observable } from 'rxjs';

import { Application, Model } from '@shared/models/_index';

@Component({
  selector: 'hs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [SortByPipe],
})
export class SidebarComponent {
  // @Input() actionButton: TemplateRef<any>;
  // @Input() isFilterEnabled: boolean = false;
  // @Input() isApplications: boolean;
  @Input() sidebarData: Observable<Application[] | Model[]>;
  @Output() clicked: EventEmitter<Model | Application> = new EventEmitter();
  @Output() filtered: EventEmitter<string> = new EventEmitter();
  @Output() bookmarked: EventEmitter<Model | Application> = new EventEmitter();
  // public sidebarList: Application[] | Model[] = [];
  // public sidebarFiltredList: Application[] | Model[] = [];

  private isRedirectable = false;
  private routeSub: Subscription;
  private sidebarDataSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sortBy: SortByPipe
  ) {
    // this.routeSub = this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd && event.url.split('/').length <= 2) {
    //     this.isRedirectable = true;
    //     this.redirectToFirst();
    //   }
    // });
  }

  // ngOnInit() {
  //   this.sidebarDataSub = this.sidebarData.subscribe(items => {
  //     this.sidebarList = this.sidebarFiltredList = items;
  //     if (this.sidebarList.length > 0) {
  //       this.redirectToFirst();
  //     }
  //   });
  // }

  // ngOnDestroy() {
  //   if (this.sidebarDataSub) {
  //     this.sidebarDataSub.unsubscribe();
  //   }
  //   if (this.routeSub) {
  //     this.routeSub.unsubscribe();
  //   }
  // }

  // onFilter(filtredItems: Application[] | Model[]): void {
  //   this.sidebarFiltredList = filtredItems;
  // }

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

  // private redirectToFirst() {
  //   if (this.isRedirectable && this.sidebarList.length > 0) {
  //     const key = this.isApplications ? 'name' : 'id';
  //     this.isRedirectable = false;

  //     this.router.navigate([this.sidebarList[0][key]], {
  //       relativeTo: this.activatedRoute,
  //     });
  //   }
  // }
}
