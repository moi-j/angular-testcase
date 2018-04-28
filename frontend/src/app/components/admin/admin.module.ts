import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from "../../modules/material.module";
import { UsersListComponent } from "../users-list/users-list.component";
import { UserFormComponent } from './user-form/user-form.component';
import { MatDialogModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MaterialModule,
    MatDialogModule,

  ],
  declarations: [
    AdminComponent,
    UsersListComponent,
    UserFormComponent
  ],
  entryComponents: [
    UserFormComponent
  ]
})
export class AdminModule { }
