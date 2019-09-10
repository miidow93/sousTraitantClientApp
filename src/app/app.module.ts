import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { ChartsModule } from 'ng2-charts';
import { NgxPrintModule } from 'ngx-print';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PosteComponent } from './components/poste/poste.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavbarComponent } from './components/admin/navbar/navbar.component';
import { SousTraitantComponent } from './components/sousTraitant/sous-traitant.component';
import { RegleComponent } from './components/regle/regle.component';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ListRegleComponent } from './components/regle/list-regle/list-regle.component';
import { UserComponent } from './components/user/user.component';
import { ContentComponent } from './components/poste/content/content.component';
import { PosteRegleComponent } from './components/poste/poste-regle/poste-regle.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { StatistiqueComponent } from './components/statistique/statistique.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { AddRegleComponent } from './components/regle/add-regle/add-regle.component';
import { EditRegleComponent } from './components/regle/edit-regle/edit-regle.component';

export function getToken() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    PosteComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    SousTraitantComponent,
    RegleComponent,
    ListRegleComponent,
    UserComponent,
    ContentComponent,
    PosteRegleComponent,
    ListUserComponent,
    StatistiqueComponent,
    EditUserComponent,
    AddRegleComponent,
    EditRegleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NgbModule,
    NgbCarouselModule,
    ChartsModule,
    NgxPrintModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: [
          'http://localhost:4772',
          'http://192.168.1.105:1020'
        ]
      }
    }),
  ],
  providers: [],
  entryComponents: [EditUserComponent, AddRegleComponent, EditRegleComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
