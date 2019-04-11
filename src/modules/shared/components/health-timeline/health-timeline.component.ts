import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    OnDestroy,
    ChangeDetectorRef,
    ViewEncapsulation,
    Output,
    EventEmitter
} from '@angular/core';
import { HealthTimelineHistoryService } from '@core/services/health-timeline-history.service';
import { HealthTimelineService } from '@core/services/health-timeline.service';
import { ITimeInterval } from '@shared/models/_index';
import { ITimelineLog } from '@shared/models/timeline-log.model';
import * as d3 from 'd3';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'hs-health-timeline',
    templateUrl: './health-timeline.component.html',
    styleUrls: ['./health-timeline.component.scss'],
    providers: [HealthTimelineService, HealthTimelineHistoryService],
    encapsulation: ViewEncapsulation.None,
})
export class HealthTimelineComponent implements OnInit, OnDestroy {

    @ViewChild('svgContainer', { read: ElementRef })
    svgContainer: ElementRef;

    @ViewChild('yTitleContainer', { read: ElementRef })
    yTitleContainer: ElementRef;

    @ViewChild('dataContainer', { read: ElementRef })
    dataContainer: ElementRef;

    @ViewChild('axisContainer', { read: ElementRef })
    axisContainer: ElementRef;

    @ViewChild('minimapContainer', { read: ElementRef })
    minimapContainer: ElementRef;

    @ViewChild('minimapDataContainer', { read: ElementRef })
    minimapDataContainer: ElementRef;

    @ViewChild('minimapBrush', { read: ElementRef })
    minimapBrush: ElementRef;

    currentFrom;
    currentTo;

    canvasHeight: number;
    canvasWidth: number = 960;

    readonly MARGIN = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    };
    readonly LINE_HEIGHT = 32;
    readonly MINIMAP_LINE_HEIGHT = 10;
    readonly Y_TITLE_WIDTH = 100;
    readonly X_AXIS_HEIGHT = 100;

    @Output()
    private timeInterval: EventEmitter<ITimeInterval> = new EventEmitter();

    private currentLogData: ITimelineLog;
    private healthTimelineDataSub: Subscription;
    private scale;
    private minimapScale;

    constructor(
        private timelineService: HealthTimelineService,
        private cd: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.healthTimelineDataSub = this.timelineService.currentData.pipe(filter(_ => !!_)).subscribe(
            logData => {
                this.currentLogData = logData;
                this.render();
            },
            error => {
                console.error(error);
            }
        );

        this.timelineService.getData(0, 1);
    }

    showZoomOut(): boolean {
        return this.timelineService.historyExist();
    }

    zoomOut(): void {
        this.timelineService.getPrevLog();
    }

    ngOnDestroy(): void {
        this.healthTimelineDataSub.unsubscribe();
    }

    private initializeElementsPosition() {
        const rowCount = Object.keys(this.currentLogData).length;
        d3.select(this.dataContainer.nativeElement)
            .attr('transform', `translate(${this.Y_TITLE_WIDTH}, ${this.MARGIN.top})`);

        d3.select(this.axisContainer.nativeElement)
            .attr('transform', `translate(${this.Y_TITLE_WIDTH}, ${this.MARGIN.top + (rowCount * this.LINE_HEIGHT)})`);

        d3.select(this.minimapContainer.nativeElement)
            .attr(
                'transform',
                `translate(${this.Y_TITLE_WIDTH}, ${this.MARGIN.top + (rowCount * this.LINE_HEIGHT) + 40})`
            );
    }

    private render(): void {
        this.initializeElementsPosition();
        this.updateScale();
        this.updateCanvasSize();
        this.updateYTitle();
        this.updateXAxis();
        this.updateDataset(this.dataContainer.nativeElement);

        this.updateMinimap();

        this.cd.detectChanges();
    }

    private updateScale() {
        this.scale = d3.scaleTime()
            .domain(this.getMinimumAndMaximumTimestamps())
            .range([0, this.canvasWidth - this.Y_TITLE_WIDTH - this.MARGIN.right]);
    }

    private updateYTitle(): void {
        const yLabels = Object.keys(this.currentLogData);

        d3.select(this.yTitleContainer.nativeElement)
          .selectAll('text')
          .data(yLabels).join(
              enter => {
                  return enter
                            .append('text')
                            .attr('class', 'y-title')
                            .attr('y', 24)
                            .attr('transform', (_, j) => `translate(0, ${(j * this.LINE_HEIGHT) + 10})`)
                            .text(d => d);
              },
              update => {
                  return update.attr('transform', (_, j) => `translate(0, ${j * this.LINE_HEIGHT + 10})`)
                              .text(d => d);
             },
             exit => exit.remove()
          );
    }

    private updateXAxis() {
        const xAxis = d3.axisBottom(this.scale);
        d3.select(this.axisContainer.nativeElement).call(xAxis);
    }

    private updateDataset(container) {
        const self = this;
        const dataRow = Object.values(this.currentLogData);
        d3.select(container)
            .selectAll('g.datarow')
            .data(dataRow)
            .join(
                enterRow => {
                    return enterRow
                        .append('g')
                        .attr('class', 'datarow')
                        .attr('transform', (d, idx) => `translate(0, ${idx * 32})`)
                        .each( function(data, index) {
                            d3
                                .select(this)
                                .selectAll('rect')
                                .data(data)
                                .join(
                                    enter => self.drawNewDatasetRect(enter),
                                    update => self.updateDatasetRect(update)
                                );
                        });
                },
                updateRow => {
                    return updateRow
                        .attr('transform', (d, idx) => `translate(0, ${idx * 32})`)
                        .each( function(data, index) {
                            d3
                                .select(this)
                                .selectAll('rect')
                                .data(data)
                                .join(
                                    enter => self.drawNewDatasetRect(enter),
                                    update => self.updateDatasetRect(update)
                                );
                        });
                },
                exit => exit.remove()
            );
    }

    private drawNewDatasetRect(enter) {
        return enter
            .append('rect')
            .attr('class', 'dataset__rect')
            .classed('dataset__rect--s',  d => d.status === 'success')
            .classed('dataset__rect--f', d => d.status === 'failed')
            .attr('height', 20)
            .attr('x', d => this.scale(new Date(d.from)))
            .attr('width', d => this.scale(new Date(d.to)) - this.scale(new Date(d.from)))
            .on('click', () => {
                this.timelineService.getData(0, 1, true);
            });
    }

    private updateDatasetRect(update) {
        return update
            .classed('dataset__rect--s', d => d.status === 'success')
            .classed('dataset__rect--f', d => d.status === 'failed')
            .attr('x', d => this.scale(new Date(d.from)))
            .attr('width', d => this.scale(new Date(d.to)) - this.scale(new Date(d.from)));
    }

    private updateCanvasSize(): void {
        this.canvasHeight = this.calculateCanvasHeight();
    }

    private calculateCanvasHeight(): number {
        const rowCount = Object.keys(this.currentLogData).length;
        return this.MARGIN.top + (rowCount * this.LINE_HEIGHT) + this.X_AXIS_HEIGHT + this.MARGIN.bottom;
    }

    private getMinimumAndMaximumTimestamps(): [number, number] {
        const logItems = Object.values(this.currentLogData);
        let minTimestamp: number;
        let maxTimestamp: number;

        for (let i = 0, l = logItems.length; i < l; i++) {
            const firstElement = logItems[i][0];
            const lastElement = logItems[i][logItems[i].length - 1];

            if (minTimestamp === undefined || firstElement.from < minTimestamp) {
                minTimestamp = firstElement.from;
            }

            if (maxTimestamp === undefined || lastElement.to > maxTimestamp) {
                maxTimestamp = lastElement.to;
            }
        }

        return [
           minTimestamp,
           maxTimestamp,
        ];
    }

    private updateMinimap() {
        this.updateMinimapScale();
        this.updateDataset(this.minimapDataContainer.nativeElement);
        this.updateBrush();
    }

    private updateMinimapScale() {
        this.minimapScale = d3.scaleTime()
            .domain(this.getMinimumAndMaximumTimestamps())
            .range([0, this.canvasWidth - this.Y_TITLE_WIDTH - this.MARGIN.right]);
    }

    private updateBrush() {
        const self = this;

        const data = Object.values(this.currentLogData)[0];

        const blockFrom = ts => {
            const exist =  data.find( d => {
                return d.from <= ts && d.to > ts;
            });

            return exist || data[0];
        };

        const blockTo = ts => {
            const exist =  data.find( d => {
                return d.from < ts && d.to >= ts;
            });

            return exist || data[data.length - 1];
        };

        const brush = d3.brushX()
            .extent([[0, 0], [840, 64]])
            .on('end', function() {

                if (!d3.event.sourceEvent) { return; }
                if (!d3.event.selection) { return; }

                const { selection, target } = d3.event;
                const dateFrom = self.minimapScale.invert(selection[0]);
                const dateTo = self.minimapScale.invert(selection[1]);

                if (( self.currentFrom &&  self.currentTo) && dateFrom.getTime() === self.currentFrom._i && dateTo.getTime() === self.currentTo._i) {
                    return;
                }

                const f = blockFrom(dateFrom);
                const t = blockTo(dateTo);

                self.currentFrom = moment(f.from);
                self.currentTo = moment(t.to);

                self.timeInterval.emit({ from: f.from, to: f.to });

                d3.select(self.minimapBrush.nativeElement)
                    .transition()
                    .duration(750)
                    .call(target.move, [
                        self.minimapScale(f.from),
                        self.minimapScale(t.to),
                    ]);

                self.rescaleMain(f.from, t.to);

                self.cd.detectChanges();
            });

        d3.select(this.minimapBrush.nativeElement).call(brush);
        d3.select(this.minimapBrush.nativeElement).select('.overlay').remove();

        self.currentFrom = moment(self.minimapScale.invert(0));
        self.currentTo = moment(self.minimapScale.invert(840));

        self.timeInterval.emit({ from: self.minimapScale.invert(0).getTime(), to: self.minimapScale.invert(840).getTime() });

        brush.move(d3.select(this.minimapBrush.nativeElement), [0, 840]);
    }

    private rescaleMain(from, to) {
        this.scale = d3.scaleTime()
            .domain([from, to]).range([0, 840]);

        this.updateDataset(this.dataContainer.nativeElement);
        this.updateXAxis();
    }

    // private updateMinimapXAxis() {
    //     const xAxis = d3.axisBottom(this.minimapScale);
    //     d3.select(this.axisContainer.nativeElement).call(xAxis);
    // }
}
