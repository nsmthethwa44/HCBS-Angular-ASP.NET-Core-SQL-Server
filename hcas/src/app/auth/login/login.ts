import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

login(): void {
  if (!this.email || !this.password) return;

   Swal.fire({
    title: 'Logging In...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });


  this.auth.login(this.email, this.password).subscribe({
    next: (res: any) => this.handleSuccess(res),
    error: () => this.handleError()
  });
}

private handleSuccess(res: any): void {
  this.auth.storeToken(res.token);
  Swal.fire({
    icon: 'success',
    title: 'Login Successful',
    text: 'You have successfully logged in.',
    timer: 1800,
    showConfirmButton: false
  });
    setTimeout(() => {
         const role = this.auth.getUserRole();
  const routeMap: Record<string, string> = {
    Admin: '/admin',
    Doctor: '/doctor',
    Patient: '/patient'
  };
  const targetRoute = role && routeMap[role] ? routeMap[role] : '/';
  this.router.navigate([targetRoute]);
    }, 3000); // Hide after 3s

}

private handleError(): void {
  setTimeout(() => {
      Swal.fire('Error', 'You tried, failed! Please try again', 'error');
    }, 3000); // Hide after 3s
}

}


