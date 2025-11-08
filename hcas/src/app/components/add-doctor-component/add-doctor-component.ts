import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../services/admin-service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-doctor-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-doctor-component.html',
  styleUrl: './add-doctor-component.scss'
})
export class AddDoctorComponent {
  private baseUrl = 'https://hcbsapi-gqb6eahuccaufrgh.southafricanorth-01.azurewebsites.net/api/admin';

 @Input() addDoctorModal: boolean = false;
 doctors: any[] = [];


  form!: FormGroup;
  selectedFile: File | null = null;

   constructor(private http: HttpClient, private service: AdminService, private fb: FormBuilder,) {
     this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0] ?? null;
  }

  // get all doctors from the database 
getDoctors() {
this.service.getDoctors().subscribe((res) =>{
  this.doctors = res;
})
}

  // adding a new doctor on form submit 
  // after success message get all doctors 
  // on error or failed show error msg 
 onCreateDoctor() {
    if (!this.form.valid || !this.selectedFile) return;

    const formData = new FormData();
    formData.append('fullName', this.form.value.fullName!);
    formData.append('email', this.form.value.email!);
    formData.append('profileImage', this.selectedFile);

    this.http.post(`${this.baseUrl}/create-doctor`, formData).subscribe({
      next: () => {
         Swal.fire({
          icon: 'success',
          title: 'New Doctor',
          text: 'Doctor successfully created!',
          timer: 1800,
          showConfirmButton: false
        });
        this.getDoctors();
      },
      error: (error) => {
        console.error(error);
       Swal.fire('Error', 'Failed to create new doctor', 'error');
      }
    });
  }

  //  hide doctor form 
   hideModal(){
     this.addDoctorModal = false;
   }

}
