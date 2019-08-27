import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { constants } from 'src/app/shared/constants';

const API = constants.api + 'visiteurs/';

@Injectable({
  providedIn: 'root'
})
export class VisiteurService {

  constructor(private http: HttpClient) { }

  getVisitors() {
    return this.http.get<any>(`${API}`)
      .pipe(
        tap(_ => this.log('visiteurs')),
        catchError(this.handleError('visiteurs', []))
      );
  }


  // Abdel
  getVisitorsToday() {
    return this.http.get<any>(`${API}today`)
      .pipe(
        tap(_ => this.log('visiteurs')),
        catchError(this.handleError('visiteurs', []))
      );
  }

  addVisitor(data) {
    return this.http.post(`${API}postev`, data);
  }

  sortieVisiteur(id: number) {
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
