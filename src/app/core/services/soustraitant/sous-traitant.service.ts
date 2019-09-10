import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { constants } from 'src/app/shared/constants';

const API = constants.api + 'soustraitants/';
@Injectable({
  providedIn: 'root'
})
export class SousTraitantService {

  constructor(private http: HttpClient) { }


  getSousTraitants() {
    return this.http.get<any>(`${API}`)
      .pipe(
        tap(_ => this.log('sous-traitant')),
        catchError(this.handleError('sous-traitant', []))
      );
  }

  getAllSousTraitants() {
    return this.http.get<any>(`${API}all`)
      .pipe(
        tap(_ => this.log('get all sous-traitant')),
        catchError(this.handleError('get all sous-traitant', []))
      );
  }

  getSoustraitantsToday() {
    return this.http.get<any>(`${API}today`)
      .pipe(
        tap(_ => this.log('superviseurs')),
        catchError(this.handleError('superviseurs', []))
      )
      ;
  }

  addSoustraitant(data) {
    return this.http.post(`${API}postev`, data);
  }

  sortieSoustraitant(id: number) {
    return this.http.get(`${API}sortie/${id}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
