import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { constants } from 'src/app/shared/constants';

// const API = 'http://localhost:4772/api/regles/';

const API = constants.api + 'regles/';

@Injectable({
  providedIn: 'root'
})
export class RegleService {

  constructor(private http: HttpClient) { }

  addRule(data) {
    return this.http.post(`${API}`, data)
      .pipe(
        tap(_ => this.log('add rule')),
        catchError(this.handleError('add rule', []))
      );
  }

  getRules() {
    return this.http.get(`${API}`)
      .pipe(
        tap(_ => this.log('add rule')),
        catchError(this.handleError('add rule', []))
      );
  }

  updateRule(id, data) {
    return this.http.put(`${API}${id}`, data)
      .pipe(
        tap(_ => this.log('update rule')),
        catchError(this.handleError('update rule', []))
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
