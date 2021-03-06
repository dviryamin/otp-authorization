import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../../models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MembershipService } from '../../services/membership.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  isOwner: boolean;
  usersDataSource$: Observable<MatTableDataSource<User>> = new Observable<MatTableDataSource<User>>();
  displayedColumns: string[] = ['name', 'roles'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private memberShipService: MembershipService,
    private dialog: MatDialog,
    keycloak: KeycloakService
  ) {
    this.isOwner = keycloak.getUserRoles().includes('owner');
  }

  ngOnInit(): void {
    this.initUsers();

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      height: '400px',
      width: '300px',
    });
  }

  initUsers(): void {
    this.usersDataSource$ = this.memberShipService.getUsers()
      .pipe(
        map(users => {
          return users.map(user => ({ ...user, realmRoles$: this.memberShipService.getUserRoles(user.id) }));
        }),
        map(users => new MatTableDataSource(users)),
        tap(dataSource => {
          dataSource.paginator = this.paginator;
          dataSource.sort = this.sort;
        })
      );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource$?.pipe(tap(dataSource => {
      dataSource.filter = filterValue.trim().toLowerCase();
      if (dataSource.paginator) {
        dataSource.paginator.firstPage();
      }
    })).subscribe();
  }
}
