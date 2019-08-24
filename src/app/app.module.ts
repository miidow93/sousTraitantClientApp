import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { VisiteurComponent } from './components/visiteur/visiteur.component';
import { RegleComponent } from './components/regle/regle.component';
import {NgbModule, NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { ListRegleComponent } from './components/regle/list-regle/list-regle.component';
import { UserComponent } from './components/user/user.component';
import { ContentComponent } from './components/poste/content/content.component';
import { PosteRegleComponent } from './components/poste/poste-regle/poste-regle.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';

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
    VisiteurComponent,
    RegleComponent,
    ListRegleComponent,
    UserComponent,
    ContentComponent,
    PosteRegleComponent,
    ListUserComponent,
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
    NgbCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
