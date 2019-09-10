import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userDataSource = new BehaviorSubject<any[]>([]);
  currentUserDataSource = this.userDataSource.asObservable();

  private ruleDataSource = new BehaviorSubject<any[]>([]);
  currentRuleDataSource = this.ruleDataSource.asObservable();

  changeUserDataSource(data) {
    console.log('User Data Service: ', data);
    this.userDataSource.next([...data]);
  }

  changeRuleDataSource(data) {
    console.log('Rule Data Service: ', data);
    this.ruleDataSource.next([...data]);
  }

  constructor() { }
}
