import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Users } from 'src/app/shared/models/users';
import { UserService } from 'src/app/core/services/user/user.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MatTableDataSource } from '@angular/material';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  public show: boolean = false;

  displayedColumns: string[] = ['no', 'nomComplet', 'username', 'email', 'password', 'action'];

  dataSource;
  oldDataSource = [];

  userUpdateForm: FormGroup;

  userToUpdate;

  constructor(private userService: UserService,
              private changeDetectorRefs: ChangeDetectorRef,
              private matDialog: MatDialog,
              private userDataService: DataService) { }

  ngOnInit() {
    this.refresh();
  }

  toggle(element) {
    console.log('ID: ', element);
    this.userToUpdate = element;
    const config = new MatDialogConfig();
    config.width = '80%';
    config.disableClose = true;
    config.autoFocus = true;
    config.data = element;
    this.matDialog.open(EditUserComponent, config).afterClosed().subscribe(res => {
      console.log('Refresh Edit');
      this.refresh();
    });
  }

  updateUser(form: NgForm) {
    if (form.valid) {
      return;
    }
    const data = {
      id: this.userToUpdate.id,
      username: this.userToUpdate.username,
      // email: form.email,
      // password: form.password,
      role: this.userToUpdate.idRole
    };

    console.log(data);
  }

  refresh() {
    /*this.userService.getUsers().subscribe(res => {
      this.dataSource = res; // new MatTableDataSource(res);
      console.log('Get Users: ', this.dataSource);
      // this.changeDetectorRefs.detectChanges();
      this.userDataService.changeUserDataSource(this.dataSource);
    });*/

    this.userDataService.currentUserDataSource.subscribe(data => this.dataSource = data);
  }


}
