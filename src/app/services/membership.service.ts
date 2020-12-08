import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  users: User[] = [];
  constructor() { }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }
  addUser(user: User): Observable<User> {
    this.users.push(user);
    return of(user);
  }
  removeUser(userId: string): Observable<User> {
    const [userToDelete] = this.users.splice(this.users.findIndex(user => user.id === userId), 1);
    return of(userToDelete);
  }
  addUserRole(userId: string, role: string): Observable<User> {
    const userToEdit = this.users.find(user => user.id === userId);
    if (!userToEdit) {
      return throwError(`User doesn't exist`);
    }
    userToEdit.roles.push(role);
    return of(userToEdit);
  }
  removeUserRole(userId: string, roleToRemove: string): Observable<User> {
    const userToEdit = this.users.find(user => user.id === userId);
    if (!userToEdit) {
      return throwError(`User doesn't exist`);
    }
    userToEdit.roles.splice(userToEdit.roles.findIndex(role => role === roleToRemove), 1);;
    return of(userToEdit);
  }
}
