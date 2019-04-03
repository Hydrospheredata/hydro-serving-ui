
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';

enum Status {
    'success' = '#76da8c',
    'failed' = '#d82f2f',
    'unknown' = 'grey',
}

const data: {
    [metricName: string]: Array<{
        from: number;
        to: number;
        status: Status;
    }>
} = {
    KS: [{
        from: 0,
        to: 10,
        status: Status.success,
    },
    {
        from: 10,
        to: 20,
        status: Status.failed,
    },
    {
        from: 20,
        to: 30,
        status: Status.success,
    }],
    Latency: [{
        from: 20,
        to: 30,
        status: Status.success,
    },
    {
        from: 30,
        to: 40,
        status: Status.failed,
    },
    {
        from: 50,
        to: 80,
        status: Status.success,
    }],
};

@Component({
    selector: 'hs-reqstore',
    templateUrl: './reqstore.component.html',
    styleUrls: ['./reqstore.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReqstoreComponent implements OnInit, AfterViewInit {
    private containerElement: Element;

    @ViewChild('container', {read: ElementRef})
    set containerRef(elementRef: ElementRef) {
        if (elementRef) {
            this.containerElement = elementRef.nativeElement;
        } else {
            throw new Error('Did not found #container element');
        }
    }

    constructor() { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        const yTitleWidth = 120;

        const scale = d3.scaleLinear()
            .domain([0, 100])
            .range([100, 940]);
        const miniScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, 940]);

        const brush = d3.brushX();

        const axis = d3.axisBottom(scale);

        const canvas = d3
            .select(this.containerElement)
            .append('svg')
                .attr('width', 960)
                .attr('height', 400);

        // parse data
        const entries = Object.entries(data);

        // draw YTitle
        // canvas
        //     .selectAll('g')
        //     .data(entries)
        //     .enter()
        //     .append('g').each(
        //         function(p, j) {
        //             d3.select(this)
        //                 .append('text')
        //                 .text(d => d[0]);

        //             d3.select(this)
        //               .selectAll('rect')
        //               .data(d => d[1])
        //               .enter()
        //               .append('rect')
        //                 .attr('width', (d: any) => scale(d.to) - scale(d.from))
        //                 .attr('height', 20)
        //                 .attr('fill', d => d.status);

        //         }
        //     );

        // YTitle
        canvas.append('g')
            .attr('class', 'yTitleBlock')
            .attr('width', 100)
            .attr('transform', 'translate(0, 32)')
            .selectAll('text')
            .data(entries)
                .enter()
                .append('text')
                .text(d => d[0])
                .attr('y', 16)
                .attr('transform', (d, i) => `translate(0, ${(i) * 32})`);

        // DataSet
        canvas.append('g')
            .attr('class', 'datasets')
            .attr('transform', 'translate(100, 32)')
            .selectAll('g')
            .data(entries)
                .enter()
                .append('g')
                .each(function(p, j) {
                    d3.select(this)
                      .attr('transform', (d, i) => `translate(0, ${(j) * 32})`)
                      .selectAll('rect')
                      .data(d => d[1])
                      .enter()
                      .append('rect')
                        .attr('x', (d: any) => scale(d.from))
                        .attr('width', (d: any) => scale(d.to) - scale(d.from))
                        .attr('height', 20)
                        .attr('fill', (d: any) => d.status);
                });


        // Scale
        canvas.append('g')
            .attr('transform', 'translate(0,130)')
            .call(axis);

        const brushed = () => {
            console.log('brushed')
        }

        //minimap
        canvas
            .append('g')
            .call(d3.brushX().on('brush', brushed))
            .attr('class', 'minimap')
            .attr('height', 200)
            .attr('width', 860)
            .attr('transform', 'translate(100,190)')
            .selectAll('g')
            .data(entries)
                .enter()
                .append('g')
                .each(function(p, j) {
                    d3.select(this)
                      .attr('transform', (d, i) => `translate(0, ${(j) * 32})`)
                      .selectAll('rect')
                      .data(d => d[1])
                      .enter()
                      .append('rect')
                        .attr('x', (d: any) => miniScale(d.from))
                        .attr('width', (d: any) => miniScale(d.to) - miniScale(d.from))
                        .attr('height', 8)
                        .attr('fill', (d: any) => d.status);
                });
    }
}
