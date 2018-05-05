import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material";
import {UserFormComponent} from "./user-form.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TestingModule} from "../../../modules/testing.module";
import {UserService} from "../../../services/user.service";
import {IBANS} from "./ibans-example";
import {Observable} from "rxjs/Rx";
import { HttpClientModule} from "@angular/common/http";

describe('UserFormDialog', () => {
  let service: UserService = new UserService(null);
  let fixture: ComponentFixture<UserFormComponent>;
  let component: UserFormComponent;

  const user = {
    'first_name': 'Pepe',
    'last_name': 'Perez',
    'iban': 'XK051212012345678906',
  };

  beforeEach( async () => {

    TestBed.configureTestingModule({
      imports: [ MatDialogModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, TestingModule, HttpClientModule ],
      declarations: [UserFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: UserFormComponent },
        { provide: MAT_DIALOG_DATA, useValue: user },
        { provide: UserService, useValue: service }
      ]
    });

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
  });


  it('should create a form with 3 imputs', () => {
    expect(component.userForm.contains('first_name')).toBeTruthy();
    expect(component.userForm.contains('last_name')).toBeTruthy();
    expect(component.userForm.contains('iban')).toBeTruthy();
  });

  it('IBAN should be required', () => {
    const control = component.userForm.get('iban');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('first_name should be required', () => {
    const control = component.userForm.get('first_name');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('last_name should be required', () => {
    const control = component.userForm.get('last_name');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('IBAN should be valid', () => {
    const control = component.userForm.get('iban');
    for( let iban of IBANS ){
      control.setValue(iban);
      expect(control.valid).toBeTruthy();
    }
  });

  it('should call updateUser if there is a user injected', () => {

    const spy = spyOn( component, "updateUser" ).and.callFake( () => {
      return Observable.empty;
    });

    component.onSubmit();

    expect(spy).toHaveBeenCalled();

  });

  it('should be true if user has changes', () => {

    const spy = spyOn( component, "updateUser" ).and.callFake( () => {
      return Observable.empty;
    });

    component.onSubmit();

    expect(spy).toHaveBeenCalled();

  });


  it('should call createUser if there is NO user injected', () => {

    component.isUpdating = false;

    const spy = spyOn( component, "createUser" ).and.callFake( () => {
      return Observable.empty;
    });

    component.onSubmit();

    expect(spy).toHaveBeenCalled();

  });

  it('should call stopLoadingAndCloseDialog when createUser returning a user', () => {

    let newUser = user;
    newUser['id'] = '01';
    newUser['own'] = true;

    spyOn( service, "createUser" ).and.returnValue(
      Observable.from([newUser])
    );

    const spy = spyOn( component, "stopLoadingAndCloseDialog" ).and.callFake( () => {
      return Observable.empty;
    });

    component.createUser();

    expect(spy).toHaveBeenCalled();

  });

  it('should return true if something has change', () => {

    component.userForm.get('first_name').setValue('newUser');

    let changedUser = component.userForm.getRawValue();

    expect(component.somethingHasChange(changedUser)).toBeTruthy();

  });

  it('should  call stopLoadingAndCloseDialog when updateUser returning a user', () => {

    let newUser = user;
    newUser['id'] = '01';
    newUser['own'] = true;

    component.userForm.get('first_name').setValue('newUser');

    spyOn( service, "updateUser" ).and.returnValue(
      Observable.from([newUser])
    );

    const spy = spyOn( component, "stopLoadingAndCloseDialog" ).and.callFake( () => {
      return Observable.empty;
    });

    component.updateUser();

    expect(spy).toHaveBeenCalled();

  });

});
