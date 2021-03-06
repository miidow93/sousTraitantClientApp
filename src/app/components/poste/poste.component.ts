import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss']
})
export class PosteComponent implements OnInit {

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
