import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {User} from "../../../interfaces/user";
import { ibanValidator } from './validators/iban.directive';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {
    if(!user){
      this.user = {
        first_name: '',
        last_name: '',
        iban: ''
      }
    }
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'first_name': new FormControl(this.user.first_name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      'last_name': new FormControl(this.user.last_name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      'iban': new FormControl(this.user.iban, [
        Validators.required,
        ibanValidator()
      ])
    });
  }

  get first_name() {
    return this.userForm.get('first_name');
  }

  get last_name() {
    return this.userForm.get('last_name');
  }

  get iban() {
    return this.userForm.get('iban');
  }
}
