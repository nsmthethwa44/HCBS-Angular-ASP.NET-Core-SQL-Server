import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-panel-list-doctors',
  imports: [CommonModule, RouterLink],
  templateUrl: './panel-list-doctors.html',
  styleUrl: './panel-list-doctors.scss'
})
export class PanelListDoctors implements OnInit{
  constructor(private service: AdminService, private auth: AuthService){}

  doctors: any[] = [];
  doctorsLink: string = "";

  getLink(){
    const role = this.auth.getUserRole();

    if(role === "Admin"){
      this.doctorsLink = "/admin/users"
    }else if(role === "Patient"){
      this.doctorsLink = "/patient/doctors";
    }else{
        this.doctorsLink = "/doctor/doctors";
    }
  }

  // get all doctors from the database 
  getDoctors() {
  this.service.getDoctors().subscribe((res) =>{
    this.doctors = res;
  })
  }

  ngOnInit(): void {
      this.getDoctors();
      this.getLink();
  }
}
