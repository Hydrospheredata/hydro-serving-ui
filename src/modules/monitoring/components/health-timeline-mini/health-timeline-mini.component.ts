import {
  Component,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { HealthTimelineService } from '@core/services/health-timeline.service';
import { TimeInterval } from '@shared/models/_index';
import { ITimelineLog } from '@shared/models/timeline-log.model';
import * as d3 from 'd3';

@Component({
  selector: 'hs-health-timeline-minimap',
  templateUrl: './health-timeline-mini.component.html',
  styleUrls: ['./health-timeline-mini.component.scss'],
  providers: [HealthTimelineService],
  encapsulation: ViewEncapsulation.None,
})
export class HealthTimelineMiniComponent implements OnInit, OnChanges {
  @ViewChild('minimapContainer', { read: ElementRef })
  minimapContainer: ElementRef;

  @ViewChild('minimapDataContainer', { read: ElementRef })
  minimapDataContainer: ElementRef;

  @ViewChild('minimapBrush', { read: ElementRef })
  minimapBrush: ElementRef;

  @Input() width;
  @Input() currentTimeInterval: TimeInterval;
  @Input() fullLog: ITimelineLog;

  @Output() brushEnd: EventEmitter<TimeInterval> = new EventEmitter();
  @Output() brushMove: EventEmitter<TimeInterval> = new EventEmitter();

  height: number;
  scale;
  healthTimelineDataSub;
  xAxisTransform: string;

  brush;

  innerTimeInterval: TimeInterval;

  constructor(public timelineService: HealthTimelineService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { fullLog, currentTimeInterval } = changes;
    if (fullLog && fullLog.currentValue) {
      if (fullLog.currentValue !== fullLog.previousValue) {
        this.render();
      }
    }

    if (currentTimeInterval === undefined) {
      return;
    }

    if (
      !currentTimeInterval.firstChange &&
      currentTimeInterval.currentValue &&
      this.brush
    ) {
      if (
        this.innerTimeInterval &&
        this.innerTimeInterval.to === currentTimeInterval.currentValue.to
      ) {
        return;
      }

      this.innerTimeInterval = currentTimeInterval.currentValue;
      d3.select(this.minimapBrush.nativeElement).call(this.brush.move, [
        this.scale(changes.currentTimeInterval.currentValue.from),
        this.scale(changes.currentTimeInterval.currentValue.to),
      ]);
    }
  }

  render() {
    this.elementsPositioning();
    this.updateScale();
    this.updateDataset();
    this.updateBrush();
  }

  private updateBrush() {
    const self = this;
    const rowCount = Object.keys(this.fullLog).length;
    const brush = d3.brushX().extent([[0, 0], [this.width, rowCount * 12]]);
    this.brush = brush;

    d3.select(this.minimapBrush.nativeElement)
      .call(brush)
      .call(brush.move, [0, this.width]);

    d3.select(this.minimapBrush.nativeElement)
      .select('.overlay')
      .remove();

    brush.on('end', () => {
      if (!d3.event.sourceEvent) {
        return;
      }
      const select = d3.event.selection;
      self.brushEnd.next({
        from: self.scale.invert(select[0]).getTime(),
        to: self.scale.invert(select[1]).getTime(),
      });
    });

    brush.on('brush', () => {
      const select = d3.event.selection;
      self.brushMove.next({
        from: self.scale.invert(select[0]).getTime(),
        to: self.scale.invert(select[1]).getTime(),
      });
    });
  }

  private updateScale() {
    this.scale = d3
      .scaleTime()
      .domain(this.timelineService.getMinimumAndMaximumTimestamps(this.fullLog))
      .range([0, this.width]);
  }

  private elementsPositioning() {
    const rowCount = Object.keys(this.fullLog).length;
    this.xAxisTransform = `translate(0, ${rowCount * 12})`;
    this.height = rowCount * 12 + 20;
  }

  private updateDataset() {
    const self = this;
    const dataRow = Object.values(this.fullLog);

    d3.select(this.minimapDataContainer.nativeElement)
      .selectAll('g.datarow')
      .data(dataRow)
      .join(
        enterRow => enterRow.append('g').attr('class', 'datarow'),
        updateRow => updateRow,
        exit => exit.remove()
      )
      .attr('transform', (_, idx) => `translate(0, ${idx * 12})`)
      .each(function(d) {
        d3.select(this)
        .selectAll('rect')
        .remove();

        d3.select(this)
          .selectAll('rect')
          .data(d)
          .join(
            enter =>
              enter
                .append('rect')
                .attr('class', 'dataset-m__rect')
                .attr('height', 4),
            update => update,
            exit => exit.remove()
          )
          .call(_ => self.drawRect(_));
      });
  }

  private drawRect(selection) {
    return selection
      .filter(d => d.meanValue !== null)
      .classed(
        'dataset-m__rect--s',
        d => d.meanHealth !== null && d.meanHealth === 1
      )
      .classed(
        'dataset-m__rect--f',
        d => d.meanHealth !== null && d.meanHealth < 1
      )
      .classed('dataset-m__rect--u', d => d.meanHealth === null)
      .attr('x', d => this.scale(new Date(d.from)))
      .attr(
        'width',
        d => this.scale(new Date(d.till)) - this.scale(new Date(d.from))
      );
  }
}
