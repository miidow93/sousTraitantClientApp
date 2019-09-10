import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private userDataService: DataService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.userService.getUsers().subscribe(res => {
      // this.changeDetectorRefs.detectChanges();
      this.userDataService.changeUserDataSource(res);
    });

    this.userDataService.currentUserDataSource.subscribe();
  }
}
