import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { VisiteurService } from 'src/app/core/services/visiteur/visiteur.service';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { FormControl } from '@angular/forms';
import { Visiteur } from 'src/app/shared/models/visiteur';
import { MatPaginator, MatTableDataSource } from '@angular/material';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-visiteur',
  templateUrl: './visiteur.component.html',
  styleUrls: ['./visiteur.component.scss'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class VisiteurComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'nomComplet', 'cinCnss', 'dateVisite', 'heureEntree', 'heureSortie', 'telephone'];

  dataSource = new MatTableDataSource();
  oldDataSource;
  pageSizeOption = [5, 10, 20];


  data = [];
  dateEntree = new FormControl(moment());
  dateSortie = new FormControl(moment());
  de; ds;
  constructor(private visiteurService: VisiteurService) { }

  ngOnInit() {
    this.visiteurService.getVisitors().subscribe(res => {
      // console.log(res);
      this.dataSource.data = res;
      this.oldDataSource = this.dataSource.data;
      this.data = <any[]>this.dataSource.data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.de = moment(this.dateEntree.value).format('YYYY-MM-DD') + 'T00:00:00';
    this.ds = moment(this.dateSortie.value).format('YYYY-MM-DD') + 'T00:00:00';
    // console.log(`1: Du ${this.de}, Au ${this.ds}`);
  }

  onChange(term, event) {
    // console.log('Date: ', term.value);
    if (event === 'dateEntree') {
      this.de = this.validateDate(term);
      console.log('De: ', new Date(this.de) + ' ' + this.de);
    } else if (event === 'dateSortie') {
      this.ds = this.validateDate(term);
      console.log('Ds: ', new Date(this.ds) + ' ' + this.ds);
    }
  }

  filtrer() {
    // console.log(`De ${this.de}, ds ${this.ds}`);
    console.log('DataSOurce: ', this.dataSource.data);
    if (this.de && this.ds) {
      // console.log('Init');
      if (this.de > this.ds) {
        alert('La date d\'entree doit être supérieure à la date de sortie');
      } else {
        // console.log(`Du ${this.de}, Au ${this.ds}`);
        const filter = this.data.filter(x => x.dateVisite >= this.de && x.dateVisite <= this.ds);
        // const filter = this.data.filter(x => x.dateVisite === this.de && x.dateVisite === this.ds);
        // console.log('Filter', filter);
        // console.log('DataSOurce: ', this.dataSource.data);
        if (filter.length > 0) {
          this.dataSource.data = filter;
        } else {
          alert('Aucun visiteur dans cette date. Veuillez choisir une nouvelle date');
        }
      }
    }
  }

  validateDate(date) {
    let result = `${date.value._i.year}`;
    const validateMonth = `${date.value._i.month}`;
    const validateDay = `${date.value._i.date}`;
    console.log('Month: ', validateMonth + ', Day: ' + validateDay);
    const time = 'T00:00:00';
    if (Number(validateMonth) < 9 && Number(validateDay) < 10) {
      result += `-0${Number(validateMonth) + 1}-0${validateDay}${time}`;
    } else {
      if (Number(validateMonth) > 9) {
        result += `-${validateMonth}`;
      } else {
        result += `-0${Number(validateMonth) + 1}`;
      }

      if (Number(validateDay) > 10) {
        result += `-${validateDay}${time}`;
      } else {
        result += `-0${validateDay}${time}`;
      }
    }
    return result;
  }

  refresh() {
    this.dataSource.data = this.oldDataSource;
  }

}
