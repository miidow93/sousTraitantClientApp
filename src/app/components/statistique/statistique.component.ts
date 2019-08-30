import { map } from 'rxjs/operators';

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { StatsService } from 'src/app/core/services/stats/stats.service';
import { BaseChartDirective, Color } from 'ng2-charts';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material';


const moment = _rollupMoment || _moment;


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class StatistiqueComponent implements OnInit, AfterViewInit {
  // @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;

  dateStats = new FormControl(moment());
  messageBarChart;
  messageLineChart;
  oldYear;
  chartReady = false;
  public barChartData: any[];
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            min: 0
          }
        }
      ]
    }
  };
  public barChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,153,0,0.5)',
    },
  ];


  public lineChartData: any[];
  public lineChartLabels = [];
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            //stepSize: 1,
            min: 0
          }
        }
      ]
    }
  };

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(102,102,102,0.2)',
    },
  ];

  constructor(private statsService: StatsService) { }
  ngOnInit() {
    /*this.statsService.getStatsByMonth(8, 2019).subscribe((res: any) => {
      // console.log('Stats: ', res.stats);
      if (res.stats) {
        this.barChartData = [{ data: this.getChartData(res.stats), label: 'Visiteur' }];
        this.barChartLabels = this.getChartLabels(res.stats);
      } else {
        alert('Aucune résultat');
      }
    });*/
  }

  ngAfterViewInit() {
    const year = moment(this.dateStats.value).format('YYYY');
    const month = moment(this.dateStats.value).format('MM');
    this.oldYear = year;
    this.statsByMonthAndYear(month, year);
  }

  getChartData(stats) {
    let data = [];
    stats.forEach(element => {
      data.push(element.count);
    });
    return data;
  }

  getChartLabels(stats) {
    let labels = [];
    stats.forEach(element => {
      labels.push(element.label);
    });

    return labels;
  }

  onChange(selectedDate) {
    const year = moment(selectedDate).format('YYYY');
    const month = moment(selectedDate).format('MM');
    this.statsByMonthAndYear(month, year);
  }

  chosenYearHandler(normalizedYear: _moment.Moment) {
    const ctrlValue = this.dateStats.value;
    ctrlValue.year(normalizedYear.year());
    this.dateStats.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>) {
    const ctrlValue = this.dateStats.value;
    ctrlValue.month(normalizedMonth.month());
    this.dateStats.setValue(ctrlValue);
    datepicker.close();
  }

  statsByMonthAndYear(month, year) {

    this.statsService.getStatsByMonth(month, year).subscribe((res: any) => {
      if (res.stats) {
        this.barChartData = [{ data: this.getChartData(res.stats), label: 'Visiteur' }];
        this.barChartLabels = this.getChartLabels(res.stats);
      } else {
        alert('Aucune résultat');
      }
    });

    this.statsService.getStatsByYear(year).subscribe((res: any) => {
      if (res.stats) {
        this.lineChartData = [{ data: this.getChartData(res.stats), label: 'Visiteur' }];
        this.lineChartLabels = this.getChartLabels(res.stats);
      } else {
        this.messageLineChart = 'Aucun résultat';
      }
    });


  }

}
