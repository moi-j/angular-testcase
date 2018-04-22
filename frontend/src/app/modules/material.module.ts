import {NgModule} from "@angular/core";
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule
  ],
  exports: [
    FlexLayoutModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
