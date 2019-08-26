import { Component, OnInit } from '@angular/core';
import { VisiteurService } from 'src/app/core/services/visiteur/visiteur.service';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { FormControl } from '@angular/forms';
import { Visiteur } from 'src/app/shared/models/visiteur';

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
export class VisiteurComponent implements OnInit {

  displayedColumns: string[] = ['Test', 'name', 'weight', 'symbol'];

  dataSource: Visiteur[];
  oldDataSource = [];

  dateEntree = new FormControl(moment());
  dateSortie = new FormControl(moment());
  de; ds;
  constructor(private visiteurService: VisiteurService) { }

  ngOnInit() {
    this.visiteurService.getVisitors().subscribe(res => {
      console.log(res);
      this.dataSource = res;
      this.oldDataSource = this.dataSource;

      console.log('Length: ', res.length);
    });

  }

  onChange(term, event) {
    // console.log('Datasource: ', this.dataSource);
    if (event === 'dateEntree') {
      this.de = this.validateDate(term);
      console.log('De: ', new Date(this.de) + ' ' + this.de);
    } else if (event === 'dateSortie') {
      this.ds = this.validateDate(term);
      console.log('Ds: ', new Date(this.ds) + ' ' + this.ds);
    }

  }
  filtrer() {

    if (this.de && this.ds) {
      if (this.de > this.ds) {
        alert('La date d\'entree doit être supérieure à la date de sortie');
      } else {
        const filter = this.dataSource.filter(x => x.dateVisite >= this.de && x.dateVisite <= this.ds);
        console.log('Filter', filter);
        if (filter.length > 0) {
          this.dataSource = filter;
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
    this.dataSource = this.oldDataSource;
  }

}
