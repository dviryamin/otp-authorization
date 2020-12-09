import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Role } from '../../models/role';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RolesService } from '../../services/roles.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddRoleComponent } from '../add-role/add-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  rolesDataSource$: Observable<MatTableDataSource<Role>> = new Observable<MatTableDataSource<Role>>();
  displayedColumns: string[] = ['name', 'otpRequired'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private roleService: RolesService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initRoles();
  }
  initRoles(): void {
    this.rolesDataSource$ = this.roleService.getRoles()
      .pipe(
        map(roles => new MatTableDataSource(roles)),
        tap(dataSource => {
          dataSource.paginator = this.paginator;
          dataSource.sort = this.sort;
        })
      );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rolesDataSource$?.pipe(tap(dataSource => {
      dataSource.filter = filterValue.trim().toLowerCase();
      if (dataSource.paginator) {
        dataSource.paginator.firstPage();
      }
    })).subscribe();


  }

  openDialog(): void {
    this.dialog.open(AddRoleComponent, {

    });
  }
}
