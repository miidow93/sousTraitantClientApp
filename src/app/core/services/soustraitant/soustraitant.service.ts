import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { constants } from 'src/app/shared/constants';

const API = constants.api + 'soustraitants/';
@Injectable({
  providedIn: 'root'
})
export class soustraitantService {

  constructor(private http:HttpClient) { }
  getSoustraitantsToday() {
    return this.http.get<any>(`${API}today`)
      // .pipe(
      //   tap(_ => this.log('superviseurs')),
      //   catchError(this.handleError('superviseurs', []))
      // )
      ;
  }
  addSoustraitant(data) {
    return this.http.post(`${API}postev`, data);
  }
  sortieSoustraitant(id: number) {
    return this.http.get(`${API}sortie/${id}`);
  }
}
