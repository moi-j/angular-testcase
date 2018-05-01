import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersListComponent} from "../components/users-list/users-list.component";
import {MaterialModule} from "./material.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    UsersListComponent
  ],
  exports: [
    UsersListComponent
  ]
})
export class SharedModule { }
