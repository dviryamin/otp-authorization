import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  roles: Role[] = [];
  constructor() { }

  getRoles(): Observable<Role[]> {
    return of(this.roles);
  }

  createRole(role: Role): Observable<Role> {
    this.roles.push(role);
    return of(role);
  }

  deleteRole(roleName: string): Observable<Role> {
    const [roleToDelete] = this.roles.splice(this.roles.findIndex(role => role.name === roleName), 1);
    return of(roleToDelete);
  }

  editRole(roleName: string, otpRequired: boolean): Observable<Role> {
    const roleToEdit = this.roles.find(role => role.name = roleName);
    if (!roleToEdit) {
      return throwError(`Role doesn't exist`);
    }
    roleToEdit.otpRequired = otpRequired;
    return of(roleToEdit);
  }
}
