import {
  Component,
  Input,
  OnDestroy,
  OnInit, Renderer2,
} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {MatDialog, MatSnackBar, MatTableDataSource} from "@angular/material";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import {UserFormComponent} from "../admin/user-form/user-form.component";
import {ConfirmationDialogComponent} from "./confirmation-dialog/confirmation-dialog.component";
import {style, trigger, state, transition, animate} from "@angular/animations";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('hidden', style({ transform: 'translateX(-200%)'})),
      state('visible', style({ transform: 'translateX(0)'})),
      transition('hidden => visible', animate('300ms ease-in')),
      transition('visible => hidden', animate('300ms ease-out')),
    ])
  ]
})
export class UsersListComponent implements OnInit, OnDestroy {

  @Input() onlyOwn: boolean;

  public isLoading: boolean;
  public numberOfUsers:number;
  displayedColumns = ['first_name', 'last_name', 'actions'];
  dataSource;

  public ibanState = 'hidden';
  public selectedIban: string;
  public ibanClass = 'hidden';
  public topPosition: string;

  private destroy$ = new Subject<void>();

  constructor(
    private _user: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private renderer: Renderer2
  ) {
    this.getData();
  }

  ngOnInit() {
  }

  getData(){
    this.isLoading = true;
    this._user.getUsers().pipe(takeUntil(this.destroy$)).subscribe( users => {
      this.numberOfUsers = users.length;
      this.setAndFilterTableData(users);
      this.isLoading = false;
    }, err => {
      console.log(err);
    });
  }

  setAndFilterTableData(users){
    this.dataSource = (this.onlyOwn) ? new MatTableDataSource(users.filter(user => (user.own))) : new MatTableDataSource(users);
  }

  refresh(){
    this.getData();
  }

  editUser(user: User){
    this.dialog.open( UserFormComponent, {data: user} ).afterClosed().subscribe( user => {
      (user) ? this.refresh() : false;
    }, err => {
      console.log(err);
      this.snackBar.open(
        'There was an error refreshing the list. Try to reload this page.',
        'Ok');
    });
  }

  deleteUser(user: User){
    this.dialog.open(ConfirmationDialogComponent, {data: user}).afterClosed().pipe(takeUntil(this.destroy$)).subscribe( result => {
      if (result) {
        this._user.deleteUser(user).pipe(takeUntil(this.destroy$)).subscribe( () => {
          this.refresh();
        }, err => {
          console.log(err);
        });
      }
    })
  }

  ngOnDestroy(){
    this.dialog.closeAll();
    this.destroy$.next();
    this.destroy$.complete();
  }

  setRowClass(){
    this.ibanClass = this.ibanState
  }

  setVisibleIban(user: User) {
    this.ibanState = 'visible';
    this.selectedIban = user.iban;
  }

  setRowPosition(e){
    this.topPosition = (this.renderer.parentNode(e.target).closest('button')) ? this.renderer.parentNode(e.target).closest('button').getBoundingClientRect().top + 'px' : e.srcElement.getBoundingClientRect().top + 'px';
  }
}
