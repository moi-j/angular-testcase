import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from "../../modules/material.module";
import { UserFormComponent } from './user-form/user-form.component';
import { MatDialogModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import {SharedModule} from "../../modules/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MaterialModule,
    MatDialogModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    UserFormComponent
  ],
  entryComponents: [
    UserFormComponent
  ]
})
export class AdminModule { }
