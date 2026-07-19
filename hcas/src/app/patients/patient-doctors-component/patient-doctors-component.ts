import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-patient-doctors-component',
  imports: [CommonModule],
  templateUrl: './patient-doctors-component.html',
  styleUrl: './patient-doctors-component.scss'
})
export class PatientDoctorsComponent {
  constructor(private adminSer: AdminService){}
   date!: number;
   doctors: any[] = [];

   getDoctors(){
    this.adminSer.getDoctors().subscribe((res) =>{
      this.doctors = res;
    })
   }
ngOnInit() {
  this.date = Date.now(); 
  this.getDoctors();
}

 getDate() {
    return this.date;
  }
}
