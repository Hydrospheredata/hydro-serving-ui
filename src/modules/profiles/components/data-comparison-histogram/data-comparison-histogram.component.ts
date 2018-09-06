import { DoubleProfile } from '@shared/models/_index';
import { Component, Input, ViewChild, ElementRef, AfterViewInit, SimpleChanges, SimpleChange } from "@angular/core";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'hydro-data-comparison-histogram',
  templateUrl: './data-comparison-histogram.component.html',
  styleUrls: ['./data-comparison-histogram.component.scss']
})
export class DataComparisonHistogramComponent implements AfterViewInit {
  @Input() trainingProfile: DoubleProfile | null;
  @Input() productionProfile: DoubleProfile | null;
  @ViewChild('chartContainer') chartContainerRef: ElementRef;

  private chart: Highcharts.ChartObject;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const trainingProfile: SimpleChange = changes.trainingProfile;
    const productionProfile: SimpleChange = changes.productionProfile;

    console.log('prev training value: ', trainingProfile.previousValue);
    console.log('got training profile: ', trainingProfile.currentValue);
    console.log('prev training value: ', productionProfile.previousValue);
    console.log('got training profile: ', productionProfile.currentValue);

    if (this.chart) {
      const bins = this.getBins();
      const trainingFreqs = this.updateFreqs(bins, this.trainingProfile);
      const productionFreqs = this.updateFreqs(bins, this.productionProfile);

      this.chart.xAxis[0].setCategories(bins.map(_ => _.toString()));
      this.chart.series[0].update({data: trainingFreqs}, true)
      this.chart.series[1].update({data: productionFreqs}, true)
    }
  }

  ngAfterViewInit() {
    if (this.trainingProfile && this.productionProfile) {
      const bins = this.getBins();
      const trainingFreqs = this.updateFreqs(bins, this.trainingProfile);
      const productionFreqs = this.updateFreqs(bins, this.productionProfile);

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
          categories: bins,
          crosshair: true
        },
        yAxis: [
          {
            labels: {
              style: {
                color: Highcharts.getOptions().colors[0],
                fontWeight: 'bold'
              }
            },
            title: {
              text: 'Training Data',
              style: {
                color: Highcharts.getOptions().colors[0],
                fontWeight: 'bold'
              }
            },
          },
          {
            labels: {
              style: {
                color: Highcharts.getOptions().colors[1],
                fontWeight: 'bold'
              }
            },
            title: {
              text: 'Production Data',
              style: {
                color: Highcharts.getOptions().colors[1],
                fontWeight: 'bold'
              }
            },
            opposite: true
          },
        ],
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
          name: 'Training Data',
          yAxis: 0,
          data: trainingFreqs
        },{
          name: 'Production Data',
          yAxis: 1,
          data: productionFreqs
        }]
      });
    }
  }

  private getBins(): number[]{
    const trainingBins = this.trainingProfile.histogram.bins;
    const productionBins = this.productionProfile.histogram.bins

    const XAxis = trainingBins.slice();
    
    return productionBins.reduce((XAxisValues, value) => {
      if(!XAxisValues.includes(value)){
        XAxisValues.push(value)
      };
      
      return XAxisValues;
    }, XAxis).sort((a, b) => a - b);
  }
  
  private matchFreqs(profile: DoubleProfile): (number) => number {
    const oldBins = profile.histogram.bins;
    const oldFreqs = profile.histogram.frequencies;
    
    return function(xAxisValue: number): number{
      const idx = oldBins.indexOf(xAxisValue);
      return idx >= 0 ? oldFreqs[idx] : 0;
    }
  }

  private updateFreqs(XAxisValues: number[], profile: DoubleProfile): number[]{
    return XAxisValues.map(this.matchFreqs(profile))
  }
}
