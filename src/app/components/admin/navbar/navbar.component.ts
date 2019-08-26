import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    const cfm = confirm('Voulez-vous déconnecter ??');
    if (cfm) {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (token) {
        console.log('Logout: ', token);
        localStorage.removeItem('token');
        if (role) {
          console.log('Logout role: ', role);
          localStorage.removeItem('role');
        }
      }
      this.router.navigate(['login']);
    } else {
      return;
    }
  }

}
