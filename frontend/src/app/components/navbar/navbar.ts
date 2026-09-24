import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html'
})
export class NavbarComponent {
  auth = inject(AuthService);
  logout() {
    this.auth.logout();
    location.href = '/login';
  }
}
