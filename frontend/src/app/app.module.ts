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
    HttpClientModule,
    MenuModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
