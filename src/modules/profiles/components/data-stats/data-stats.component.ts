import { DoubleProfile } from '@shared/models/_index';
import { Component, Input, ViewChild, ElementRef, AfterViewInit, SimpleChanges, SimpleChange } from "@angular/core";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'hydro-data-stats',
  templateUrl: './data-stats.component.html',
  styleUrls: ['./data-stats.component.scss']
})
export class DataStatsComponent implements AfterViewInit {
  @Input() profile: DoubleProfile | null
  @ViewChild('chartContainer') chartContainerRef: ElementRef;
  private chart: Highcharts.ChartObject;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const profile: SimpleChange = changes.profile;
    console.log('prev value: ', profile.previousValue);
    console.log('got profile: ', profile.currentValue);
    if (this.chart) {
      this.chart.xAxis[0].setCategories(profile.currentValue.histogram.bins.map(_ => _.toString()));
      this.chart.series[0].update({data: profile.currentValue.histogram.frequencies}, true)
    }
    // this._name = name.currentValue.toUpperCase();
  }

  ngAfterViewInit() {
    if (this.profile) {
      this.chart = Highcharts.chart(this.chartContainerRef.nativeElement, {
        chart: {
          type: 'column'
        },
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: this.profile.histogram.bins,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key:.1f}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0,
            shadow: false
          }
        },
        legend: {
          enabled: false
        },
        series: [{
          name: 'Data',
          data: this.profile.histogram.frequencies
      
        }]
      });
    }
  }
}
