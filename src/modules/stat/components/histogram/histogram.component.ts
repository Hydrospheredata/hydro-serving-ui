import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FeatureReportHistogram, Stat } from "../../models";
import * as Highcharts from "highcharts";
import { Chart } from "highcharts";

@Component({
  selector: 'hs-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.scss']
})
export class HistogramComponent implements OnChanges, AfterViewInit {
  @Input() config: FeatureReportHistogram;
  @ViewChild('anchor', {read: ElementRef}) anchor: ElementRef;
  private chart: Chart;

  constructor(private readonly el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && changes.config.currentValue && this.chart) {
      const {training, deployment} = changes.config.currentValue as FeatureReportHistogram;
      this.chart.series[0].update({type: 'column', data: training});
      this.chart.series[1].update({type: 'column', data: deployment});
    }
  }

  ngAfterViewInit(): void {
    this.chart = Highcharts.chart(this.anchor.nativeElement, {
      chart: {
        type: 'column',
      },
      title: {
        text: '',
      },
      subtitle: {
        text: '',
      },
      xAxis: {
        categories: this.config.bins as string[],
        crosshair: true,
      },
      yAxis:
        [
          {
            title: {
              text: '',
            },
            labels: {
              format: '{value}%',
            },
          },
        ],
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key:.1f}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.2f}%</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      legend: {
        layout: 'horizontal',
      },
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0,
          groupPadding: 0,
          shadow: false,
        },
      },
      series: [{
        type: 'column',
        name: 'Training Data',
        data: this.config.training,
        color: 'red',
      }, {
        type: 'column',
        name: 'Production Data',
        data: this.config.deployment,
        color: 'blue',
      }],
    });
  }
}
