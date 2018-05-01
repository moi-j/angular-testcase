import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { User } from "../../../interfaces/user";
import { ibanValidator } from './validators/iban.directive';
import { lettersValidator } from "./validators/letters.directive";
import { UserService } from "../../../services/user.service";
import {Subject} from "rxjs/Subject";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  public userForm: FormGroup;
  public hasServerErrors: boolean = false;
  public serverErrors: string[];
  public serverErrorTypes: string[];
  public isLoading: boolean = false;
  public isUpdating: boolean = false;

  constructor(
    private _user: UserService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
  ) {
    this.createForm();
    if(user){
      this.isUpdating = true;
      this.userForm.setValue({
        'first_name': this.user.first_name,
        'last_name': this.user.last_name,
        'iban': this.user.iban
      });
    }
  }

  ngOnInit() {}

  createForm() {
    this.userForm = new FormGroup({
      'first_name': new FormControl('', [
        Validators.required,
        lettersValidator(),
        Validators.minLength(2),
      ]),
      'last_name': new FormControl('', [
        Validators.required,
        lettersValidator(),
        Validators.minLength(2),
      ]),
      'iban': new FormControl('', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(32),
        ibanValidator(),
        // ibanLengthValidator(),
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

  onSubmit() {
    if (this.userForm.valid){
      this.isLoading = true;
      this.user = this.userForm.value;
      this._user.createUser(this.user).pipe(takeUntil(this.destroy$)).subscribe( newUser => {
        this.isLoading = false;
        this.dialogRef.close(newUser);
      }, err => {
        this.isLoading = false;
        (err.error) ? this.errorHandler(err.error) : false;
      });
    } else {
      console.log('invalid');
    }
  }

  errorHandler(error){
    this.serverErrorTypes = [];
    this.serverErrors = error;
    for(let ind in error){
      this.serverErrorTypes.push(ind);
    }
    this.hasServerErrors = true;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
