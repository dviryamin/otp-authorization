import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { UsersComponent } from './pages/users/users.component';
import { RolesComponent } from './pages/roles/roles.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: 'roles', component: RolesComponent },
  { path: '', data: { roles: ['owner'] }, canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: {roles: ['owner']}},
  { path: 'unauthorized', component: UnauthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
