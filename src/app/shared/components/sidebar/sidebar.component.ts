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
import { HydroConfigService } from '@app/core/hydro-config.service';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Application, Model, DeploymentConfig } from '@app/core/data/types';

@Component({
  selector: 'hs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit, OnDestroy {
  @Input() sidebarData: Application[] | Model[] | DeploymentConfig[] = [];
  @Input() selectedItem: Application | Model | DeploymentConfig;
  @Output() clicked: EventEmitter<Model | Application | DeploymentConfig> =
    new EventEmitter();
  @Output() filtered: EventEmitter<string> = new EventEmitter();
  @Output() bookmarked: EventEmitter<Model | Application | DeploymentConfig> =
    new EventEmitter();

  @ContentChild('button', { static: true }) button: ElementRef;
  @ContentChild('.hide', { static: true }) hide: ElementRef;

  filter: FormControl = new FormControl('');
  private destroy: Subject<any> = new Subject<any>();

  constructor(private readonly config: HydroConfigService) {}

  ngAfterViewInit(): void {
    this.filter.valueChanges.pipe(takeUntil(this.destroy)).subscribe(val => {
      this.filtered.next(val);
    });
  }

  toggleBookmark(item: Model | Application | DeploymentConfig): void {
    event.stopPropagation();
    this.bookmarked.emit(item);
  }

  handleClick(item: Model | Application | DeploymentConfig): void {
    this.clicked.emit(item);
  }

  get isEmpty(): boolean {
    return this.sidebarData === null || this.sidebarData.length === 0;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  withHeader(): boolean {
    return this.config.config.showHeader;
  }
}
