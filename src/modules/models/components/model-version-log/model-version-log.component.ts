import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { ModelVersionLogService } from '@models/services/model-version-log.service';
import { ModelVersion } from '@shared/_index';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-model-version-log',
  templateUrl: './model-version-log.component.html',
  styleUrls: ['./model-version-log.component.scss'],
})
export class ModelVersionLogComponent implements OnInit, AfterViewChecked {
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  @Input() modelVersion: ModelVersion;
  log$: Observable<string[]>;

  autoScroll: boolean = true;
  constructor(private logService: ModelVersionLogService) {}

  ngOnInit() {
    this.log$ = this.logService.getLog(this.modelVersion.id);
    this.addScrollListener();
  }

  ngAfterViewChecked(): void {
    if (this.autoScroll) { this.scrollDown(); }
  }

  private scrollDown() {
    const el: HTMLElement = this.container.nativeElement;
    el.scrollTop = el.scrollHeight;
  }

  private addScrollListener(): void {
    const el: HTMLElement = this.container.nativeElement;
    el.addEventListener('scroll', () => {
      const {scrollHeight, scrollTop} = el;
      const { height } = el.getBoundingClientRect();
      const thisIsEnd = scrollTop === (scrollHeight - height);

      this.autoScroll = thisIsEnd;
    });
  }
}
