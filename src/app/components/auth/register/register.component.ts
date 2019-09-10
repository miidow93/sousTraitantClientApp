import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { FormErrorStateMatcher } from 'src/app/core/handlers/form-error-state-matcher';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { DataService } from 'src/app/shared/services/data.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  nomComplet = '';
  username = '';
  password = '';
  isLoadingResults = false;
  matcher = new FormErrorStateMatcher();
  roles;
  dataSource;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private roleService: RoleService,
              private userService: UserService,
              private userDataService: DataService) { }

  userToUpdate;

  ngOnInit() {
    this.userDataService.currentUserDataSource.subscribe();
    this.registerForm = this.formBuilder.group({
      nomComplet: [null, [Validators.required]],
      email: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required/*, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$')*/]],
      idRole: [null, [Validators.required]]
    });

    this.roleService.getRoles().subscribe(res => {
      if (res) {
        this.roles = res;
      }
    });

    this.registerForm.reset();
  }

  onFormSubmit(form: NgForm) {
    this.userService.addUser(form)
      .subscribe(async res => {
        // console.log(res);
        this.registerForm.reset();
        // this.refresh();
        await this.userService.getUsers().pipe(take(1)).toPromise().then(data => this.userDataService.changeUserDataSource(data));
      }, err => {
        console.log(err);
      });
  }

  /*public findInvalidControls() {
    const invalid = [];
    const controls = this.registerForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        // console.log(controls[name].dirty);
        invalid.push(name);
      }
    }
    return invalid;
  }

  refresh() {
    this.userService.getUsers().subscribe(res => {
      this.dataSource = res; // new MatTableDataSource(res);
      // this.changeDetectorRefs.detectChanges();
      this.userDataService.changeUserDataSource(this.dataSource);
    });

    this.userDataService.currentUserDataSource.subscribe(data => console.log('DataSource: ', data));
  }*/


}
