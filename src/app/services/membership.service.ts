import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MappingsRoles, Role } from '../models/role';
import { map, reduce, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  realm = 'OTP-Authorization';
  baseUrl = 'https://keycloak-keycloak.apps.40.86.86.149.xip.io/auth/admin/realms';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/${this.realm}/users`);
  }
  getUserRoles(id: string): Observable<string[]> {
    return this.http
      .get<{ name: string }[]>(`${this.baseUrl}/${this.realm}/users/${id}/role-mappings/realm`)
      .pipe(map(realmRoles => realmRoles.map(role => role.name)));
  }
  addUser(user: User): Observable<User> {
    this.http.post(`${this.baseUrl}/${this.realm}/users`, user);
    return of(user);
  }
  removeUser(userId: string): Observable<User> {
    const userToDelete = this.http.delete<User>(`${this.baseUrl}/${this.realm}/users/${userId}`);
    return userToDelete;
  }
  addUserRole(userId: string, role: string): Observable<User> {
    const userToEdit = this.http.post<User>(`${this.baseUrl}/${this.realm}/users/${userId}/role-mappings/realm`, role);
    if (!userToEdit) {
      return throwError(`User doesn't exist`);
    }
    return userToEdit;
  }
  removeUserRole(userId: string, roleToRemove: string): Observable<User> {
    const userToEdit = this.http.delete<User>(`${this.baseUrl}/{realm}/users/{id}/role-mappings/realm`);
    return userToEdit;
  }
}
