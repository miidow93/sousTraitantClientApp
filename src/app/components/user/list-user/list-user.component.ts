import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Users } from 'src/app/shared/models/users';
import { UserService } from 'src/app/core/services/user/user.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MatTableDataSource } from '@angular/material';
import { EditUserComponent } from '../edit-user/edit-user.component';

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
              private matDialog: MatDialog) { }

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
      // console.log('Closed: ', res);
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
    this.userService.getUsers().subscribe(res => {
      this.dataSource = res; // new MatTableDataSource(res);
      this.changeDetectorRefs.detectChanges();
    });
  }
}
