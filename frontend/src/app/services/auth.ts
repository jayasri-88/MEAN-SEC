import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;

  register(data: { name: string; email: string; password: string }) {
    return this.http.post<{ token: string; user: any }>(`${this.apiUrl}/register`, data)
      .pipe(tap(res => { if (res.token) localStorage.setItem('token', res.token); }));
  }

  login(data: { email: string; password: string }) {
    return this.http.post<{ token: string; user: any }>(`${this.apiUrl}/login`, data)
      .pipe(tap(res => { if (res.token) localStorage.setItem('token', res.token); }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getProfile() {
    return this.http.get(`${this.apiUrl}/profile`);
  }
}
