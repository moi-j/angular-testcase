import {NgModule} from "@angular/core";
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatMenuModule, MatProgressBarModule, MatSnackBarModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  exports: [
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
