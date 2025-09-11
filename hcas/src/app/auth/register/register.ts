import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth-service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
 registerForm: FormGroup;
 isSubmitting = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(){
    if (this.registerForm.invalid) return;
     Swal.fire({
    title: 'Registering...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

    this.isSubmitting = true;
    this.authService.register(this.registerForm.value).subscribe({
         next: (res: any) => this.handleSuccess(res),
          error: () => this.handleError(),
          complete: () => {this.isSubmitting = false;}
    });
  }

private handleSuccess(res: any): void {
  Swal.fire("Success", 'Registration successfully.', "success")
    .then(() => {
      this.router.navigate(['/login']);
    });
}

  
  private handleError(): void {
    setTimeout(() => {
         Swal.fire("Error", 'Registration failed. Please try again.', "error")
      }, 3000); // Hide after 3s
  }

}
