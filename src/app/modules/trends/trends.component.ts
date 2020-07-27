import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import * as fromRoot from "../../store";
import { selectAllTelemetry } from "./store";
import { getTrends } from "./store/trends-actions";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as moment from 'moment';
import 'moment-timezone';
import {Observable, Subscription} from "rxjs";
import {TrendsEffects} from "./store/trends-effects";

export interface DateOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {
  searchText = '';
  public selectedTags = [];
  public startDateString = moment().set({hour: 0, minute: 0, second: 0, millisecond: 0}).toISOString();
  public endDateString = moment(this.startDateString).add(1, 'days').toISOString();

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
          return 'TAG: ' + data.datasets[tooltipItem.datasetIndex].label;
          // var amount = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          // var total = eval(data.datasets[tooltipItem.datasetIndex].data.join("+"));
          // return amount + ' / ' + total + ' ( ' + parseFloat(amount * 100 / total).toFixed(2) + '% )';
        },
        footer: (tooltipItem, data)  => {
          //return moment(data.labels[tooltipItem[0].index]).format('ddd, MMM D YYYY HH:mm:ss');
          return moment().format('ddd, MMM D YYYY HH:mm:ss');
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

  trendsSub;

  constructor(
    private store: Store<fromRoot.State>,
    private trendsEffects: TrendsEffects
  ) { }

  ngOnInit(): void {
    this.lineChartData = [
      { data: [0, 0], label: '' }
    ];
    this.lineChartLabels = ['0', '0'];

    this.trendsSub = this.trendsEffects.getTrends$.subscribe((data) => { this.handleTelemetryChange(data) });

    //this.store.select(selectAllTelemetry).subscribe((data) => { this.handleTelemetryChange(data) });
  }

  ngOnDestroy() {
    this.trendsSub.unsubscribe();
  }

  getTrends() {
    this.selectedTags = ['AREA6_0027_PI'];
    this.store.dispatch(getTrends({clientId: '5e41f50d47504d03aeed10b8', start: '2020-05-19T00:00:00.000Z', end: '2020-05-20T01:00:00.000Z', tags: this.selectedTags.join(','), interval: '1h'}));
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

    let tnum = 1;
    let datetz;

    for (const telemetry of telemetries.data) {
      const labelNumber = tnum % this.selectedTags.length;

      if (labelNumber === 0) {
        const date = moment.tz(telemetry.date, 'Etc/GMT+0');

        datetz = date.tz(moment.tz.guess());
        lineChartLabels.push(datetz);
      }
      data[telemetry.tag].data.push(telemetry.data.summary.mean);

      tnum++;
    }

    const lineChartData = [];

    for (const tag of this.selectedTags) {
      lineChartData.push(data[tag]);
    }

    this.lineChartData = lineChartData;
    this.lineChartLabels = lineChartLabels;
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

}
