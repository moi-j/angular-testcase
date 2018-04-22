import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
} from "angular5-social-login";

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import {environment} from "../environments/environment";
import {MaterialModule} from "./modules/material.module";

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
    AppRoutingModule,
    SocialLoginModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
