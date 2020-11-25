import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  ContentChild,
  ElementRef,
} from '@angular/core';
import { FormControl } from '@node_modules/@angular/forms';
import { Subject } from '@node_modules/rxjs';
import { takeUntil } from '@node_modules/rxjs/internal/operators';
import { Application, Model, DeploymentConfig } from '@app/core/data/types';

@Component({
  selector: 'hs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit, OnDestroy {
  @Input() sidebarData: Application[] | Model[] | DeploymentConfig[] = [];
  @Input() selectedItem: Application | Model | DeploymentConfig;
  @Output() clicked: EventEmitter<Model | Application> = new EventEmitter();
  @Output() filtered: EventEmitter<string> = new EventEmitter();
  @Output() bookmarked: EventEmitter<Model | Application> = new EventEmitter();

  @ContentChild('button') button: ElementRef;
  @ContentChild('.hide') hide: ElementRef;

  filter: FormControl = new FormControl('');

  private destroy: Subject<any> = new Subject<any>();

  ngAfterViewInit(): void {
    this.filter.valueChanges.pipe(takeUntil(this.destroy)).subscribe(val => {
      this.filtered.next(val);
    });
  }

  toggleBookmark(item: Model | Application): void {
    event.stopPropagation();
    this.bookmarked.emit(item);
  }

  handleClick(item: Model | Application): void {
    this.clicked.emit(item);
  }

  get isEmpty(): boolean {
    return this.sidebarData === null || this.sidebarData.length === 0;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
