import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './pages/users/users.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatChipsModule } from '@angular/material/chips';
import { RolesComponent } from './pages/roles/roles.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://keycloak-keycloak.apps.40.86.86.149.xip.io/auth',
        realm: 'OTP-Authorization',
        clientId: 'otp-authorization',
      },
      initOptions: {
        onLoad: 'login-required',
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UnauthorizedComponent,
    ProfileComponent,
    RolesComponent
  ],
  imports: [
    MatChipsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
