import {
  Component,
  Input,
  ViewContainerRef,
  ViewChild,
  TemplateRef,
  OnInit,
  HostListener,
} from '@angular/core';

@Component({
  selector: '[hs-tooltip]',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
  hidden: boolean = true;
  @Input() 'hs-tooltip': string = '';
  @ViewChild('tpl', { read: TemplateRef }) tpl: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  get text(): string {
    return this['hs-tooltip'];
  }

  ngOnInit(): void {
    this.container.createEmbeddedView(this.tpl);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.hidden = false;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.hidden = true;
  }
}
