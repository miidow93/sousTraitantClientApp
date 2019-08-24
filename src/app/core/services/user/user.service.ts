import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const API = 'http://localhost:4772/api/users/';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }


  getUsers() {
    return this.http.get<any>(`${API}`)
      .pipe(
        tap(_ => this.log('get all users')),
        catchError(this.handleError('get all users', []))
      );
  }

  addUser(data) {
    return this.http.post(`${API}`, data)
      .pipe(
        tap(_ => this.log('get all users')),
        catchError(this.handleError('add user', []))
      );
  }

  updateUser(id, data) {
    return this.http.put(`${API}/${id}`, data)
      .pipe(
        tap(_ => this.log(`update user with ID: ${id}`)),
        catchError(this.handleError('update user', []))
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
