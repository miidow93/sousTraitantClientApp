import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editUserForm: FormGroup;
  userToUpdate;
  roles;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private roleService: RoleService,
              private dialogRef: MatDialogRef<EditUserComponent>,
              private userDataService: DataService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.userDataService.currentUserDataSource.subscribe();
    this.editUserForm = this.formBuilder.group({
      id: [this.data.id, [Validators.required]],
      nomComplet: [this.data.nomComplet, [Validators.required]],
      email: [this.data.email, [Validators.required]],
      username: [{ value: this.data.username, disabled: true }, [Validators.required]],
      password: [this.data.password, [Validators.required]],
      idRole: [this.data.idRole, [Validators.required]]
    });

    this.roleService.getRoles().subscribe(res => {
      this.roles = res;
    });
    console.log('Opened: ', this.data);
    this.userToUpdate = this.data;
  }

  onEditSubmit(form) {
    form.username = this.data.username;
    this.userService.updateUser(this.userToUpdate.id, form).subscribe(async res => {
      await this.userService.getUsers().pipe(take(1)).toPromise().then(data => this.userDataService.changeUserDataSource(data));
    });
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

}
