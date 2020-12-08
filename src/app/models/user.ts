import { Observable } from 'rxjs';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  realmRoles$: Observable<string[]>;
}
