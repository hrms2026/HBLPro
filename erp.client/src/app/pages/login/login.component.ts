import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { ILoginService } from '../../services/ilogin.service';
import { UserCredential } from '../../models/usercredential.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  credential: UserCredential = new UserCredential();

  constructor(
    private http: HttpClient, 
    private router: Router,
    private iloginService: ILoginService
  ) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.iloginService.getLogin(this.credential).subscribe({
      next: (data: UserCredential) => {
        // Handle successful login
        if (data.message === "Success") {
          // Store JWT token in local storage
          localStorage.setItem('token', data.token);
          sessionStorage.setItem('user',JSON.stringify(data.user))
          // Navigate to the home page
          this.router.navigate(['dashboard']);
        } else {
          // Handle failed login
          alert(data.message || 'Login failed');
        }
      },
      error: (error: HttpErrorResponse) => {
        // Handle error response
        console.error('Login error:', error);
        // Extract and display the error message
        const errorMessage = error.error?.message || 'An unknown error occurred';
        alert(errorMessage);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token on logout
    this.router.navigate(['login']);
  }
}
