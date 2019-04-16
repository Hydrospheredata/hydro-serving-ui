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
import { ITimeInterval } from '@shared/models/_index';
import { ITimelineLog } from '@shared/models/timeline-log.model';
import * as d3 from 'd3';
import { filter } from 'rxjs/operators';

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

    @Input() width: number = 840;
    @Input() currentTimeInterval: ITimeInterval;
    @Input() fullLog: ITimelineLog;

    @Output() brushEnd: EventEmitter<ITimeInterval> = new EventEmitter();
    @Output() brushMove: EventEmitter<ITimeInterval> = new EventEmitter();

    height: number;
    scale;
    healthTimelineDataSub;
    xAxisTransform: string;

    brush;

    innerTimeInterval: ITimeInterval;

    intrev;

    constructor(
        public timelineService: HealthTimelineService
    ) {}

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { fullLog, currentTimeInterval } = changes;

        if (fullLog && fullLog.currentValue) {
            if (fullLog.currentValue !== fullLog.previousValue) {
                this.render();
            }
        }

        if (!currentTimeInterval.firstChange
            && currentTimeInterval.currentValue
            && this.brush
        ) {
            if (this.innerTimeInterval && this.innerTimeInterval.to === currentTimeInterval.currentValue.to) { return; }

            this.innerTimeInterval = currentTimeInterval.currentValue;
            d3.select(this.minimapBrush.nativeElement).call(this.brush.move, [
                this.scale(changes.currentTimeInterval.currentValue.from),
                this.scale(changes.currentTimeInterval.currentValue.to),
            ]);
        }
    }

    render() {
        this.updateScale();
        this.updateDataset();
        this.elementsPositioning();
        this.updateBrush();
    }

    private updateBrush() {
        const self = this;
        const rowCount = Object.keys(this.fullLog).length;
        const brush = d3.brushX().extent([[0, 0], [840, rowCount * 12]]);
        this.brush = brush;

        d3.select(this.minimapBrush.nativeElement)
            .call(brush)
            .call(brush.move, [0, 840]);

        d3.select(this.minimapBrush.nativeElement).select('.overlay').remove();

        brush.on('end', function() {
            if (!d3.event.sourceEvent) { return; }
            const select = d3.event.selection;
            self.brushEnd.next({
                from: self.scale.invert(select[0]).getTime(),
                to: self.scale.invert(select[1]).getTime(),
            });
        });

        brush.on('brush', function() {
            const select = d3.event.selection;
            self.brushMove.next({
                from: self.scale.invert(select[0]).getTime(),
                to: self.scale.invert(select[1]).getTime(),
            });
        });
    }

    private updateScale() {
        this.scale = d3.scaleTime()
            .domain(this.timelineService.getMinimumAndMaximumTimestamps(this.fullLog))
            .range([0, 840]);
    }

    private elementsPositioning() {
        const rowCount = Object.keys(this.fullLog).length;
        this.xAxisTransform = `translate(0, ${rowCount * 12})`;
    }

    private updateDataset() {
        const self = this;
        const dataRow = Object.entries(this.fullLog);

        d3.select(this.minimapDataContainer.nativeElement)
            .selectAll('g.datarow')
            .data(dataRow, d => d[0])
            .join(
                enterRow => enterRow.append('g').attr('class', 'datarow'),
                updateRow => updateRow,
                exit => exit.remove()
            ).attr('transform', (_, idx) => `translate(0, ${idx * 12})`)
             .each( function(d) {
                d3.select(this)
                    .selectAll('rect')
                    .data(d[1])
                    .join(
                        enter => enter.append('rect').attr('class', 'dataset-m__rect').attr('height', 4),
                        update => update,
                        exit => exit.remove()
                    ).call(_ => self.drawRect(_));
            });
    }

    private drawRect(selection) {
        return selection
            .classed('dataset-m__rect--s',  d => d.status === 'success')
            .classed('dataset-m__rect--f', d => d.status === 'failed')
            .attr('x', d => this.scale(new Date(d.from)))
            .attr('width', d => this.scale(new Date(d.to)) - this.scale(new Date(d.from)));
    }
}
