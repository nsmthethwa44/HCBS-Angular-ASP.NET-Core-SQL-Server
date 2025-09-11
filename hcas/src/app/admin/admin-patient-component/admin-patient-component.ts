import { Component } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-patient-component',
  imports: [],
  templateUrl: './admin-patient-component.html',
  styleUrl: './admin-patient-component.scss'
})
export class AdminPatientComponent {
 constructor(private adminSer: AdminService){}
  patients: any[] = []

    // get patients 
getPatients() {
  this.adminSer.getPatients().subscribe((res) =>{
    this.patients = res;
  })
}

  deletePatient(id: number) {
     Swal.fire({
    title: 'Are you sure you want to delete this patient?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete patient!'
  }).then((res) =>{
    if(res.isConfirmed){
      this.adminSer.deleteUser(id).subscribe(() =>{
        Swal.fire('Success', 'Patients successfully deleted!', 'success')
         this.getPatients();
      })
    }
  }).catch((error) =>{
    Swal.fire("Error", 'Failed to delete patient', 'error');
      console.error(error);
  })
  }

  ngOnInit(): void {
    this.getPatients();
  }
}
