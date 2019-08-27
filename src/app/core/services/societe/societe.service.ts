import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'http://localhost:4772/api/Societes/';
@Injectable({
  providedIn: 'root'
})
export class SocieteService {

  constructor(private http: HttpClient) { }
  getSocietes() {
    return this.http.get<any>(`${API}`);
  }
}
