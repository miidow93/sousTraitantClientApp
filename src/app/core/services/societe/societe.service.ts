import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from 'src/app/shared/constants';

const API = constants.api + 'societes/';

@Injectable({
  providedIn: 'root'
})
export class SocieteService {

  constructor(private http: HttpClient) { }
  getSocietes() {
    return this.http.get<any>(`${API}`);
  }
}
