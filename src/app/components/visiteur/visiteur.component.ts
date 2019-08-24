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
    console.log('Datasource: ', this.dataSource);
    if (event === 'dateEntree') {
      this.de = `${term.value._i.year}-0${term.value._i.month + 1}-${term.value._i.date}T00:00:00`;
    } else if (event === 'dateSortie') {
      this.ds = `${term.value._i.date}/${term.value._i.month}/${term.value._i.year}`;
    }
    console.log(this.de);
    console.log(new Date(this.de).toLocaleString());
    var filter = this.dataSource.filter(x => x.dateVisite === this.de);
    // var find = this.dataSource.find(x => x.name === term);

    console.log('Filter', filter);
    // console.log('Find', find);
    if (filter.length > 0) {
      console.log('Length', filter);
      this.dataSource = filter;
    } else {
      this.dataSource = this.oldDataSource;
    }
  }

  // onChangeDateSortie(dateS) {
  //   console.log('Term2: ', dateS.value._i);
  //   const date = `${dateS.value._i.date}/${dateS.value._i.month}/${dateS.value._i.year}`;
  //   console.log('Date2: ', date);
  // }
}
