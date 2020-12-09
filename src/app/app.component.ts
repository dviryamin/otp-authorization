import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'otp-authorization';
  isOwner: boolean;
  isDeveloper: boolean;
  constructor(private keycloak: KeycloakService) {
    this.isOwner = keycloak.getUserRoles().includes('owner');
    this.isDeveloper = keycloak.getUserRoles().includes('developer');
  }

  async logout(): Promise<void> {
    await this.keycloak.logout();
  }
}
