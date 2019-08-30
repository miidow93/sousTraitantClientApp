import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from 'src/app/shared/constants';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const API = constants.api + 'stats/';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  getStatsByMonth(month, year) {
    return this.http.get(`${API}${month}/${year}`)
    .pipe(
      tap(_ => this.log('stats by month')),
      catchError(this.handleError('stats by month', []))
    );
  }

  getStats() {
    return this.http.get(`${API}`)
    .pipe(
      tap(_ => this.log('stats by year')),
      catchError(this.handleError('stats by year', []))
    );
  }

  getStatsByYear(year) {
    return this.http.get(`${API}${year}`)
    .pipe(
      tap(_ => this.log('stats by year')),
      catchError(this.handleError('stats by year', []))
    );
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
