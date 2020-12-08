import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const USERS: User[] = [{id: '1', name: 'orel', roles: ['none']},
                       {id: '2', name: 'dani', roles: ['admin']},
                       {id: '3', name: 'moki', roles: ['dev']}]

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  realm = 'OTP-Authorization';
  baseUrl: string = 'https://keycloak-keycloak.apps.40.86.86.149.xip.io/auth/admin/realms';
  users: User[] = [];
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/${this.realm}/users`);
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
    this.http.delete(`${this.baseUrl}/{realm}/users/{id}/role-mappings/realm`)
    const userToEdit = this.users.find(user => user.id === userId);
    if (!userToEdit) {
      return throwError(`User doesn't exist`);
    }
    userToEdit.roles.splice(userToEdit.roles.findIndex(role => role === roleToRemove), 1);;
    return of(userToEdit);
  }
}
