import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role';
import { RolesService } from 'src/app/services/roles.service';
import { RolesComponent } from '../roles/roles.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  roles$?: Observable<Role[]>;
  constructor(private rolesService: RolesService) { }

  ngOnInit(): void {
    this.roles$=this.rolesService.getRoles();
  }
}
