import { SousTraitantComponent } from './components/sousTraitant/sous-traitant.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegleComponent } from './components/regle/regle.component';
import { UserComponent } from './components/user/user.component';
import { PosteComponent } from './components/poste/poste.component';
import { PosteRegleComponent } from './components/poste/poste-regle/poste-regle.component';
import { AuthGuard } from './core/guard/auth.guard';
import { StatistiqueComponent } from './components/statistique/statistique.component';



const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', component: SousTraitantComponent, outlet: 'admin', canActivate: [AuthGuard] },
      { path: 'sousTraitant', component: SousTraitantComponent, outlet: 'admin', canActivate: [AuthGuard] },
      { path: 'regles', component: RegleComponent, outlet: 'admin', canActivate: [AuthGuard] },
      { path: 'users', component: UserComponent, outlet: 'admin', canActivate: [AuthGuard] },
      { path: 'stats', component: StatistiqueComponent, outlet: 'admin', canActivate: [AuthGuard] }
    ]
  },
  { path: 'poste', component: PosteComponent, canActivate: [AuthGuard] },
  { path: 'poste/regle', component: PosteRegleComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
