import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import * as fromRoot from "../../store";
import * as authHelper from '../../shared/helpers/auth.helper';
import { getTags, getTrends } from "./store/trends-actions";
import { TrendsStoreFacade } from "./store/trends-store-facade";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as moment from 'moment';
import 'moment-timezone';
import { Observable } from "rxjs";
import { TrendsEffects } from "./store/trends-effects";
import { TagGroupModel } from "../../shared/models";
import { MatSnackBar } from "@angular/material/snack-bar";
import { getSelectedClient } from "../clients/store";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import {getAllClients, setSelectedClient} from "../clients/store/clients-actions";

export interface DateOptions {
  value: string;
  viewValue: string;
}

export interface IntervalOptions {
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
  public startDate = this.defaultStartDate;
  public endDate = this.defaultEndDate;
  public telemetryInterval = '10m';
  public tags$: Observable<TagGroupModel[]>;

  dateOptions: DateOptions[] = [
    {value: '0', viewValue: 'Yesterday'},
    {value: '1', viewValue: 'Today'},
    {value: '2', viewValue: 'Last 7 days'},
    {value: '3', viewValue: 'Last 14 days'},
    {value: '4', viewValue: 'Last month'},
    {value: '5', viewValue: 'Custom'}
  ];

  public selectedDateOption = '1';
  public activeDateOption = '1';
  public activeTelemetryDataValue = 'mean';

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
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
  public clientSub;
  public clientId;

  constructor(
    private store: Store<fromRoot.State>,
    private trendsEffects: TrendsEffects,
    private snackBar: MatSnackBar,
    private trendsStoreFacade: TrendsStoreFacade,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.clientSub = this.store.pipe(select(getSelectedClient)).subscribe((clientId) => {this.clientId = clientId});

    this.lineChartData = [
      { data: [0, 0], label: '' }
    ];
    this.lineChartLabels = ['0', '0'];

    this.trendsSub = this.trendsEffects.getTrends$.subscribe((data) => { this.handleTelemetryChange(data) });
    this.store.dispatch(getTags({clientId: authHelper.getUser().client}));
    this.tags$ = this.trendsStoreFacade.tags$;
    this.store.dispatch(getAllClients());
    this.store.dispatch(setSelectedClient({client: authHelper.getUser().client}));
  }

  ngOnDestroy() {
    this.trendsSub.unsubscribe();
    this.clientSub.unsubscribe();
  }

  getTrends() {
    if (this.selectedTags.length === 0) {
      this.lineChartData = [
        { data: [0, 0], label: '' }
      ];
      this.lineChartLabels = ['0', '0'];
      return;
    }
    this.store.dispatch(getTrends({clientId: this.clientId, start: this.startDate.toISOString(), end: this.endDate.toISOString(), tags: this.selectedTags.join(','), interval: this.telemetryInterval, dataType: this.activeTelemetryDataValue}));
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

  changeValue(event) {
    this.activeTelemetryDataValue = event.value;
    this.getTrends();
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
        fill: false,
        label: tag,
        yAxisID: yAxisId
      };
    }

    const lineChartLabels = [];
    const lineChartLabelsString: string[] = [];

    let datetz;
    let datetzString;
    let telemetryDataValue;

    for (const telemetry of telemetries.data) {

      const date = moment.tz(telemetry.date, 'Etc/GMT+0');

      datetz = date.tz(moment.tz.guess());
      datetzString = datetz.toString();

      if (!lineChartLabelsString.includes(datetzString)) {
        lineChartLabelsString.push(datetzString);
        lineChartLabels.push(datetz);
      }

      switch(this.activeTelemetryDataValue) {
        case 'median':
          telemetryDataValue = telemetry.data.summary.median;
          break;
        case 'min':
          telemetryDataValue = telemetry.data.summary.min;
          break;
        case 'max':
          telemetryDataValue = telemetry.data.summary.max;
          break;
        default:
          telemetryDataValue = telemetry.data.summary.mean;
      }

      data[telemetry.tag].data.push(telemetryDataValue);
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
      case '5':
        this.openCustomDialog();
        return;
        break;
    }
    this.startDate = startDate;
    this.endDate = endDate;

    this.getTrends();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  openCustomDialog(): void {

    const dialogRef = this.dialog.open(DialogSelectCustomDatesComponent, {
      width: '350px',
      data: {
        startDate: this.startDate.format('YYYY-MM-DD'),
        endDate: this.endDate.format('YYYY-MM-DD'),
        startTime: this.startDate.format('HH:mm'),
        endTime: this.endDate.format('HH:mm'),
        interval: this.telemetryInterval
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }

      if (result.startTime === undefined || result.endTime === undefined) {
        this.openSnackBar('Invalid start or end times. Dates not updated.');
        return;
      }

      const startTimeSplit = result.startTime.split(':');
      const startMinutes = (parseInt(startTimeSplit[0], 10) * 60) + parseInt(startTimeSplit[1], 10);

      const endTimeSplit = result.endTime.split(':');
      const endMinutes = (parseInt(endTimeSplit[0], 10) * 60) + parseInt(endTimeSplit[1], 10);

      result.startDate = moment(result.startDate).add(startMinutes, 'minutes');
      result.endDate = moment(result.endDate).add(endMinutes, 'minutes');

      console.log(result);
      this.startDate = result.startDate;
      this.endDate = result.endDate;
      this.telemetryInterval = result.interval;
      this.getTrends();
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok');
  }

}

export interface DialogData {
  startDate: object;
  endDate: object;
  startTime: string;
  endTime: string;
  interval: string;
}

@Component({
  selector: 'app-dialog-select-custom-dates',
  templateUrl: 'app-dialog-select-custom-dates.html',
})
export class DialogSelectCustomDatesComponent {

  intervalOptions: IntervalOptions[] = [
    {value: '1s', viewValue: '1 second'},
    {value: '5s', viewValue: '5 seconds'},
    {value: '10s', viewValue: '10 seconds'},
    {value: '30s', viewValue: '30 seconds'},
    {value: '1m', viewValue: '1 minute'},
    {value: '5m', viewValue: '5 minutes'},
    {value: '10m', viewValue: '10 minutes'},
    {value: '30m', viewValue: '30 minutes'},
    {value: '1h', viewValue: '1 hour'},
    {value: '2h', viewValue: '2 hours'},
    {value: '4h', viewValue: '4 hours'},
    {value: '6h', viewValue: '5 hours'},
    {value: '8h', viewValue: '8 hours'},
    {value: '12h', viewValue: '12 hours'},
    {value: '1d', viewValue: '1 day'},
    {value: '1w', viewValue: '1 week'}
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogSelectCustomDatesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
