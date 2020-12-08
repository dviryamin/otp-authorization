import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userProfile?: KeycloakProfile;

  constructor(private keycloak: KeycloakService) { }

  async ngOnInit() {
    this.userProfile = await this.keycloak.loadUserProfile();
  }

}
