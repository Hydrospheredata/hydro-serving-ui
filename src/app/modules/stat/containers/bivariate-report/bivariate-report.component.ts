import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BivariateReport, HeatmapConfig, HeatmapData } from '../../models';
import { toHeatmapData } from '../../utils/to-heatmap-data';

@Component({
  selector: 'hs-bivariate-report',
  templateUrl: './bivariate-report.component.html',
  styleUrls: ['./bivariate-report.component.scss'],
})
export class BivariateReportComponent implements OnInit {
  @Input() set bivariateReports(reports: BivariateReport[]) {
    this.productionHeatmapConfig = undefined;
    this.trainingHeatmapConfig = undefined;

    if (this.bivariateReport) {
      const biReport = reports.find(
        r => r.feature_2 === this.bivariateReport.feature_2
      );
      if (biReport) {
        this.changeSelectedBivariateReport(biReport);
      }
    }

    this.reports = reports;
    if (this.bivariateReport === undefined && this.reports.length) {
      this.changeSelectedBivariateReport(this.reports[0]);
    }
  }

  @ViewChild('tooltipEl', { read: ElementRef, static: true })
  tooltipEl: ElementRef;

  reports: BivariateReport[] = [];
  bivariateReport: BivariateReport;
  productionHeatmapConfig: HeatmapConfig;
  trainingHeatmapConfig: HeatmapConfig;

  hoveredItem: HeatmapData;
  tooltip: {
    xAxis: string;
    xValue: string;
    yAxis: string;
    yValue: string;
    productionValue: number;
    trainingValue: number;
    left: number;
    top: number;
  };

  constructor() {}

  ngOnInit() {}

  changeSelectedBivariateReport(report: BivariateReport): void {
    this.bivariateReport = report;
    if (report) {
      const xAxisName = this.bivariateReport.production_heatmap.x_axis_name;
      const yAxisName = this.bivariateReport.production_heatmap.y_axis_name;

      this.productionHeatmapConfig = {
        title: 'Production',
        xAxisName,
        yAxisName,
        xLabels: this.bivariateReport.production_heatmap.x,
        yLabels: this.bivariateReport.production_heatmap.y,
        data: toHeatmapData(
          this.bivariateReport.production_heatmap.x,
          this.bivariateReport.production_heatmap.y,
          this.bivariateReport.production_heatmap.density
        ),
      };

      this.trainingHeatmapConfig = {
        title: 'Training',
        xAxisName,
        yAxisName,
        xLabels: this.bivariateReport.training_heatmap.x,
        yLabels: this.bivariateReport.training_heatmap.y,
        data: toHeatmapData(
          this.bivariateReport.training_heatmap.x,
          this.bivariateReport.training_heatmap.y,
          this.bivariateReport.training_heatmap.density
        ),
      };
    }
  }

  handleHoverItem(d: HeatmapData): void {
    this.hoveredItem = d;

    if (d) {
      const { offsetX, offsetY } = window.event as MouseEvent;
      const yIndex = this.productionHeatmapConfig.yLabels.indexOf(d.y);
      const xIndex = this.productionHeatmapConfig.xLabels.indexOf(d.x);

      this.tooltip = {
        xAxis: this.bivariateReport.production_heatmap.x_axis_name,
        xValue: d.x,
        yAxis: this.bivariateReport.production_heatmap.y_axis_name,
        yValue: d.y,
        productionValue: this.bivariateReport.production_heatmap.density[
          yIndex
        ][xIndex],
        trainingValue: this.bivariateReport.training_heatmap.density[yIndex][
          xIndex
        ],
        top: offsetY + 12,
        left: offsetX + 12,
      };
    } else {
      this.tooltip = undefined;
    }
  }
}
