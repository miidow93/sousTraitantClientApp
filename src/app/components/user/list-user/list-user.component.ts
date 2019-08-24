import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Users } from 'src/app/shared/models/users';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  public show: boolean = false;

  displayedColumns: string[] = ['no', 'nomComplet', 'username', 'email', 'action'];

  dataSource;
  oldDataSource = [];

  userUpdateForm: FormGroup;

  userToUpdate;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(res => this.dataSource = res);
    this.userUpdateForm = this.formBuilder.group({
      username: [{value: '', disabled: true}, Validators.required],
      nomComplet: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  toggle(element) {
    console.log('ID: ', element);
    this.userToUpdate = element;
    // this.userService.userUpdateObsevable.subscribe(res => {
    //   this.userService.userUpdate.next(element);
    // });
    // this.show = !this.show;
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
