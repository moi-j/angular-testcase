import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import {TestingModule} from "../../modules/testing.module";
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement, NgModule, Renderer2} from "@angular/core";
import {UserService} from "../../services/user.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialog, MatDialogModule, MatDialogRef,  MatSnackBar} from "@angular/material";
import {Observable, pipe} from "rxjs/Rx";
import {UserFormComponent} from "../admin/user-form/user-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmationDialogComponent} from "./confirmation-dialog/confirmation-dialog.component";
import {OverlayRef} from "@angular/cdk/overlay";

class MockedUserService {

  users = [
    {id: '01', first_name: 'Mariano', last_name: 'Rajoy', iban: 'ES7921000813610123456789', own: false },
    {id: '02', first_name: 'Angela', last_name: 'Merkel', iban: 'DE91100000000123456789', own: true },
    {id: '03', first_name: 'Theresa', last_name: 'May', iban: 'GB98MIDL07009312345678', own: true },
    {id: '04', first_name: 'Emmanuel', last_name: 'Macron', iban: 'FR7630006000011234567890189', own: false },
    {id: '05', first_name: 'Alexis', last_name: 'Tsipras', iban: 'GR9608100010000001234567890', own: true },
    {id: '06', first_name: 'Sergio', last_name: 'Mattarella', iban: 'IT60X0542811101000000123456', own: false }
  ];

  getUsers(): Observable<any>{
    return Observable.of([this.users]);
  }
}

describe('UsersListComponent', () => {
  let fixture: ComponentFixture<UsersListComponent>;
  let component: UsersListComponent;
  let service: MockedUserService;
  let de: DebugElement;
  let el: HTMLElement;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;
  let renderer: Renderer2;

  beforeEach(async(() => {

    service = new MockedUserService();

    TestBed.configureTestingModule({
      declarations: [ UsersListComponent ],
      imports: [
        TestingModule,
        BrowserAnimationsModule,
        CustomDialogModule
      ],
      providers: [
        {
          provide: UserService,
          useValue: service
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    dialog = fixture.debugElement.injector.get(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter data', () => {

    let allUsers;

    service.getUsers().subscribe( users => {
      allUsers = users;
    });

    let filteredUsers = component.filterData(allUsers);

    for (let user of filteredUsers) {
      expect(user.own).toBeTruthy();
    }

  });

  it('should call get data on refresh', () => {

    const spy = spyOn( component, "getData" ).and.callFake( () => {
      return Observable.empty;
    });

    component.refresh();

    expect(spy).toHaveBeenCalled();

  });

  it('should set user iban visible', () => {

    let user = {
        id: '01',
        first_name: 'Mariano',
        last_name: 'Rajoy',
        iban: 'ES7921000813610123456789',
        own: false
      };


      component.setVisibleIban(user);

      expect(component.ibanState).toBe('visible');
      expect(component.selectedIban).toBe(user.iban);

  });

  it('should open UserFormDialog', () => {

    let user = {
        id: '01',
        first_name: 'Mariano',
        last_name: 'Rajoy',
        iban: 'ES7921000813610123456789',
        own: false
      };

    const spy = spyOn( component.dialog, "open" ).and.callThrough();

    component.editUser(user);

    expect(spy).toHaveBeenCalled();

  });

  it('should open ConfirmDialog', () => {

    let user = {
        id: '01',
        first_name: 'Mariano',
        last_name: 'Rajoy',
        iban: 'ES7921000813610123456789',
        own: false
      };

    const spy = spyOn( component.dialog, "open" ).and.callThrough();

    component.deleteUser(user);

    expect(spy).toHaveBeenCalled();

  });

});
const TEST_DIRECTIVES = [
  UserFormComponent,
  ConfirmationDialogComponent
];
@NgModule({
  imports: [
    TestingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  declarations: [
    TEST_DIRECTIVES
  ],
  exports: [
    TEST_DIRECTIVES
  ],
  entryComponents: [
    TEST_DIRECTIVES
  ]
})
export class CustomDialogModule {}
