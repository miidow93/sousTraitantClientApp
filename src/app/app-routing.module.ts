import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { VisiteurComponent } from './components/visiteur/visiteur.component';
import { RegleComponent } from './components/regle/regle.component';
import { UserComponent } from './components/user/user.component';
import { PosteComponent } from './components/poste/poste.component';
import { PosteRegleComponent } from './components/poste/poste-regle/poste-regle.component';
import { AuthGuard } from './core/guard/auth.guard';


const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', component: VisiteurComponent, outlet: 'admin'/*, canActivate: [AuthGuard]*/ },
      { path: 'visiteurs', component: VisiteurComponent, outlet: 'admin'/*, canActivate: [AuthGuard]*/ },
      { path: 'regles', component: RegleComponent, outlet: 'admin'/*, canActivate: [AuthGuard]*/ },
      { path: 'users', component: UserComponent, outlet: 'admin'/*, canActivate: [AuthGuard]*/ }
    ]
  },
  // { path: 'visiteurs', component: VisiteurComponent, outlet: 'admin' },
  { path: 'login', component: LoginComponent },
  // { path: '**', redirectTo: 'login' },
  { path: 'poste', component: PosteComponent, canActivate: [AuthGuard] },
  { path: 'poste/regle', component: PosteRegleComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
