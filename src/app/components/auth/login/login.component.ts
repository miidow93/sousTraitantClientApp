import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormErrorStateMatcher } from 'src/app/core/handlers/form-error-state-matcher';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username = '';
  password = '';
  matcher = new FormErrorStateMatcher();
  isLoadingResults = false;
  message = '';

  /*, @Inject(LOCALE_ID) public locale: string*/

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // console.log('Locale: ', this.locale);
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required/*, Validators.minLength(6)*/]],
      password: [null, [Validators.required/*, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$')*/]]
    });
  }

  onFormSubmit(form: NgForm) {
    this.authService.login(form)
      .subscribe(res => {
        console.log('Login: ', res);
        if (res.message) {
          this.message = res.message;
        }
        if (res.token) {
          localStorage.setItem('token', res.token);
          if (res.role) {
            localStorage.setItem('role', res.role);
            if (res.role === 'Admin' || res.role === 'Directeur') {
              this.router.navigate(['admin']);
            } else {
              this.router.navigate(['poste']);
            }
          }
        }
      }, err => console.log('Error: ', err));

  }
}
