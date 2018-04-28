import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../../modules/material.module";
import { SocialLoginModule } from "angular5-social-login";

// Components
import {MenuComponent} from "./menu.component";

//Services
import {AdminService} from "../../services/admin.service";
import { DesktopMenuComponent } from './desktop-menu/desktop-menu.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    SocialLoginModule
  ],
  declarations: [
    MenuComponent,
    DesktopMenuComponent,
    MobileMenuComponent
  ],
  providers: [
    AdminService
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
