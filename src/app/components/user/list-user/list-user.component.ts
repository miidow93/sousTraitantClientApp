import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Users } from 'src/app/shared/models/users';
import { UserService } from 'src/app/core/services/user/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
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

  constructor(private userService: UserService, private formBuilder: FormBuilder, private matDialog: MatDialog) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      console.log(res);
      this.dataSource = res;
    });
  }

  toggle(element) {
    console.log('ID: ', element);
    this.userToUpdate = element;
    const config = new MatDialogConfig();
    config.width = '80%';
    config.autoFocus = true;
    config.data = element;
    this.matDialog.open(EditUserComponent, config);
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
    // this.userService.updateUser(this.userToUpdate.id, form).subscribe(res => console.log(res));
  }
}
