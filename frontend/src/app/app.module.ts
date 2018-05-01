import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthServiceConfig, GoogleLoginProvider } from "angular5-social-login";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule} from "@angular/common/http";
import { MenuModule } from "./components/menu/menu.module";

// Components
import { AppComponent } from './app.component';

//Providers
import { httpInterceptorProviders } from "./http-interceptors/interceptors";

// Environment vars
import { environment } from "../environments/environment";
import { AuthGuard } from "./guards/auth-guard.service";
import {MaterialModule} from "./modules/material.module";
import {UserService} from "./services/user.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomeComponent } from './components/home/home.component';
import { ConfirmationDialogComponent } from './components/users-list/confirmation-dialog/confirmation-dialog.component';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "./modules/shared.module";

// Configs
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(environment.google_client_id)
        }
      ]
  );
  return config;
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    MenuModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmationDialogComponent,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    httpInterceptorProviders,
    AuthGuard,
    UserService
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
