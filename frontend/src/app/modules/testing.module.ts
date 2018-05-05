import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./material.module";
import {MenuModule} from "../components/menu/menu.module";
import {UserFormComponent} from "../components/admin/user-form/user-form.component";
import {ConfirmationDialogComponent} from "../components/users-list/confirmation-dialog/confirmation-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    // MenuModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    // MenuModule
  ]
})
export class TestingModule { }
