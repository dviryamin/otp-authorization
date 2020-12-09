import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Role } from '../models/role';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  realm = 'OTP-Authorization';
  id = 'OTP-Authorization';
  baseUrl: string = 'https://keycloak-keycloak.apps.40.86.86.149.xip.io/auth/admin/realms';
  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/${this.realm}/roles`);
  }

  createRole(role: Role): Observable<Role> {
    this.http.post(`${this.baseUrl}/${this.realm}/clients/${this.id}/roles`, role)
    return of(role);
  }

  deleteRole(roleName: string): Observable<Role> {
    const roleToDelete = this.http.delete<Role>(`${this.baseUrl}/${this.realm}/clients/${this.id}/roles/${roleName}`)
    return roleToDelete;
  }

  editRole(roleName: string, role: Role): Observable<Role> {
    const roleToEdit = this.http.put<Role>(`${this.baseUrl}/${this.realm}/clients/${this.id}/roles/${roleName}`, role);
    return roleToEdit;
  }
}
