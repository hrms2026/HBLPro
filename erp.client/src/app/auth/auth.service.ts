import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user'); // Simple authentication check
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('user', 'admin'); // Set user info
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('user'); // Clear user info
  }
}
