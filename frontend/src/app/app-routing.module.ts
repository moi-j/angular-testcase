import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import {AppComponent} from "./app.component";
import {UsersListComponent} from "./components/users-list/users-list.component";
import {AuthGuard} from "./guards/auth-guard.service";
import {HomeComponent} from "./components/home/home.component";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'login',
    loadChildren: 'app/components/login/login.module#LoginModule'
  },
  {
    path: 'admin',
    loadChildren: 'app/components/admin/admin.module#AdminModule',
    canActivate: [
      AuthGuard
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
