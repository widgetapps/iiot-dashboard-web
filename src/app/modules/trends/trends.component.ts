import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../store";
import {getTags, getTrends} from "./store/trends-actions";
import { TrendsStoreFacade } from "./store/trends-store-facade";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as moment from 'moment';
import 'moment-timezone';
import {Observable, Subscription} from "rxjs";
import {TrendsEffects} from "./store/trends-effects";
import {TagGroup} from "../../shared/models/taggroup.model";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface DateOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})

export class TrendsComponent implements OnInit, OnDestroy {

  private defaultStartDate = moment().set({hour: 0, minute: 0, second: 0, millisecond: 0});
  private defaultEndDate = moment(this.defaultStartDate).add(1, 'days');

  searchText = '';
  public selectedTags = [];
  public startDateString = this.defaultStartDate.toISOString();
  public endDateString = this.defaultEndDate.toISOString();
  public telemetryInterval = '10m';
  public tags$: Observable<TagGroup[]>;

  dateOptions: DateOptions[] = [
    {value: '0', viewValue: 'Yesterday'},
    {value: '1', viewValue: 'Today'},
    {value: '2', viewValue: 'Last 7 days'},
    {value: '3', viewValue: 'Last 14 days'},
    {value: '4', viewValue: 'Last month'},
    {value: '5', viewValue: 'Custom'}
  ];
  // If the user selects Custom, display a dialog letting the user select start date/time and duration and compare

  public selectedDateOption = '1';
  public activeDateOption = '1';

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        type: 'time'
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(2,12,120,0.3)',
          },
          ticks: {
            fontColor: 'rgba(2,12,120,0.3)',
          }
        }
      ]
    },
    tooltips: {
      callbacks: {
        title: (tooltipItem, data) => {
          const labelSplit = data.datasets[tooltipItem[0].datasetIndex].label.split('_');
          const sensor = labelSplit[labelSplit.length - 1];
          let sensorString;

          switch (sensor) {
            case 'VI':
              sensorString = 'Vibration';
              break;
            case 'TI':
              sensorString = 'Temperature';
              break;
            case 'CI':
              sensorString = 'Humidity';
              break;
            case 'EI':
              sensorString = 'Battery Voltage';
              break;
            case 'PI':
              sensorString = 'Pressure';
              break;
            default:
              sensorString = '';
          }
          return sensorString;
        },
        label: (tooltipItem, data) => {
          return data.datasets[tooltipItem.datasetIndex].label;
        },
        afterTitle: (tooltipItem, data)  => {
          return (parseFloat(tooltipItem[0].value).toFixed(3).toString());
        },
        footer: (tooltipItem, data)  => {
          return (tooltipItem[0].label);
        }
      }
    }
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  public trendsSub;

  public testClientId = '5e41f50d47504d03aeed10b8';

  constructor(
    private store: Store<fromRoot.State>,
    private trendsEffects: TrendsEffects,
    private snackBar: MatSnackBar,
    private trendsStoreFacade: TrendsStoreFacade
  ) { }

  ngOnInit(): void {
    this.lineChartData = [
      { data: [0, 0], label: '' }
    ];
    this.lineChartLabels = ['0', '0'];

    this.trendsSub = this.trendsEffects.getTrends$.subscribe((data) => { this.handleTelemetryChange(data) });
    this.store.dispatch(getTags({clientId: this.testClientId}));
    this.tags$ = this.trendsStoreFacade.tags$;
  }

  ngOnDestroy() {
    this.trendsSub.unsubscribe();
  }

  getTrends() {
    if (this.selectedTags.length === 0) {
      this.lineChartData = [
        { data: [0, 0], label: '' }
      ];
      this.lineChartLabels = ['0', '0'];
      return;
    }
    this.store.dispatch(getTrends({clientId: this.testClientId, start: this.startDateString, end: this.endDateString, tags: this.selectedTags.join(','), interval: this.telemetryInterval}));
  }

  removeTag(tag: string) {
    this.selectedTags = this.selectedTags.filter((value, index, arr) => {
      if (value !== tag) {
        return value;
      }
    });
  }

  addTag(location: string, asset: string, sensor: string) {
    if (this.selectedTags.length >= 6) {
      this.openSnackBar('You cannot select more than 6 tags.');
      return;
    }
    this.selectedTags.push(location + '_' + asset + '_' + sensor);
  }

  handleTelemetryChange(telemetries) {
    const data = [];

    for (const tag of this.selectedTags) {
      const tagSplit = tag.split('_');
      let yAxisId = 'y-axis-0';
      if (tagSplit[tagSplit.length - 1] === 'VI') {
        yAxisId = 'y-axis-1';
      }
      data[tag] = {
        data: [],
        label: tag,
        yAxisID: yAxisId
      };
    }

    const lineChartLabels = [];
    const lineChartLabelsString: string[] = [];

    let datetz;
    let datetzString;

    for (const telemetry of telemetries.data) {

      const date = moment.tz(telemetry.date, 'Etc/GMT+0');

      datetz = date.tz(moment.tz.guess());
      datetzString = datetz.toString();

      if (!lineChartLabelsString.includes(datetzString)) {
        lineChartLabelsString.push(datetzString);
        lineChartLabels.push(datetz);
      }

      data[telemetry.tag].data.push(telemetry.data.summary.mean);
    }

    const lineChartData = [];

    for (const tag of this.selectedTags) {
      lineChartData.push(data[tag]);
    }

    this.lineChartData = lineChartData;
    this.lineChartLabels = lineChartLabels;
  }

  updateDateRange(e) {
    let startDate;
    let endDate;

    switch (e) {
      case '0':
        startDate = moment().subtract(1, 'days').set({hour: 0, minute: 0, second: 0, millisecond: 0});
        endDate = moment(startDate).add(1, 'days');
        this.telemetryInterval = '10m';
        break;
      case '1':
        startDate = moment().set({hour: 0, minute: 0, second: 0, millisecond: 0});
        endDate = moment(startDate).add(1, 'days');
        this.telemetryInterval = '10m';
        break;
      case '2':
        startDate = moment().subtract(6, 'days').set({hour: 0, minute: 0, second: 0, millisecond: 0});
        endDate = moment(startDate).add(7, 'days');
        this.telemetryInterval = '2h';
        break;
      case '3':
        startDate = moment().subtract(13, 'days').set({hour: 0, minute: 0, second: 0, millisecond: 0});
        endDate = moment(startDate).add(14, 'days');
        this.telemetryInterval = '4h';
        break;
      case '4':
        startDate = moment().subtract(1, 'months').add(1, 'days').set({hour: 0, minute: 0, second: 0, millisecond: 0});
        endDate = moment(startDate).add(1, 'months');
        this.telemetryInterval = '12h';
        break;
        /*
      case '5':
        this.openDialog();
        return;
        break;
        */
    }
    this.startDateString = startDate.toISOString();
    this.endDateString = endDate.toISOString();

    this.getTrends();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok');
  }

}
