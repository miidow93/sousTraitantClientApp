import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { FormErrorStateMatcher } from 'src/app/core/handlers/form-error-state-matcher';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { RoleService } from 'src/app/core/services/role/role.service';

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

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private roleService: RoleService, private userService: UserService) { }

  userToUpdate;

  ngOnInit() {
    // this.authorized = localStorage.getItem('role');
    /*if (this.authorized !== 'Admin') {
      this.router.navigate(['login']);
    }*/
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
  }

  onFormSubmit(form: NgForm) {
    /*const data = {
      nomComplet: form.nomComplet,
      email: form.email,
      username: form.username,
      password: form.password,
      role: form.role
    };
    console.log('Data: ', form);*/
    this.userService.addUser(form)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['login']);
      }, err => {
        console.log(err);
      });
  }

  public findInvalidControls() {
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


}
