import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { DoubleProfile } from '@shared/models';
import * as Highcharts from 'highcharts';
import { HIGHCHART_COLORS } from './highchart-colors';

@Component({
  selector: 'hs-profiles-comparison-histogram',
  template: `
    <div class="comparison-histogram">
      <p class="comparison-histogram__header">Comparison histogram</p>
      <div #chartContainer></div>
    </div>
  `,
  styleUrls: ['./profiles-comparison-histogram.component.scss'],
})
export class ProfilesComparisonHistogramComponent implements AfterViewInit, OnChanges {
  @Input() trainingProfile: DoubleProfile | null;
  @Input() productionProfile: DoubleProfile | null;
  @ViewChild('chartContainer') chartContainerRef: ElementRef;

  private trainingDataColor = HIGHCHART_COLORS.profiles.training;
  private productionDataColor = HIGHCHART_COLORS.profiles.production;
  private chart: Highcharts.Chart;

  ngOnChanges(changes: SimpleChanges) {
    const trainingProfile: SimpleChange = changes.trainingProfile;
    const productionProfile: SimpleChange = changes.productionProfile;

    this.trainingProfile = trainingProfile && trainingProfile.currentValue;
    this.productionProfile = productionProfile && productionProfile.currentValue;

    if (this.chart) {
      const bins = this.getBins();
      const trainingFreqs = this.freqsToPercent(bins, this.trainingProfile);
      const productionFreqs = this.freqsToPercent(bins, this.productionProfile);

      this.chart.xAxis[0].setCategories(bins.map(_ => _.toString()));
      this.chart.series[0].update({type: 'column', data: trainingFreqs}, true);
      this.chart.series[1].update({type: 'column', data: productionFreqs}, true);
    }
  }

  ngAfterViewInit() {
      const bins = this.getBins();
      const trainingCount = this.freqsToPercent(bins, this.trainingProfile);
      const productionCount = this.freqsToPercent(bins, this.productionProfile);

      this.chart = Highcharts.chart(this.chartContainerRef.nativeElement, {
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
          categories: bins,
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
          data: trainingCount,
          color: this.trainingDataColor,
        }, {
          type: 'column',
          name: 'Production Data',
          data: productionCount,
          color: this.productionDataColor,
        }],
      });
  }

  private getBins(): any[] {
    const trainingBins = (this.trainingProfile && this.trainingProfile.histogram.bins) || [];
    const productionBins = (this.productionProfile && this.productionProfile.histogram.bins) || [];

    return productionBins.reduce((bins, bin) => {
      if (!bins.includes(bin)) {
        bins.push(bin);
      }

      return bins;
    }, trainingBins.slice()).sort((a, b) => a - b);
  }

  private matchFreqs(profile: DoubleProfile): (num: number) => number {
    const oldBins: number[] = (profile && profile.histogram.bins) || [];
    const oldFreqs: number[] = (profile && profile.histogram.frequencies) || [];
    let count = 0;
    if (profile) {
      count = profile.commonStatistics.count - profile.commonStatistics.missing;
    }
    return (bin: number): number => {
      if (count === 0) { return 0; }

      const idx = oldBins.indexOf(bin);
      if (idx >= 0) {
        return (oldFreqs[idx] / count) * 100;
      } else {
        return 0;
      }
    };
  }

  private freqsToPercent(bins: number[], profile: DoubleProfile): number[] {
    return bins.map(this.matchFreqs(profile));
  }
}
