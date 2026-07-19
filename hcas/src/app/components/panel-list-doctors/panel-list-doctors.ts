import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-panel-list-doctors',
  imports: [CommonModule, RouterLink],
  templateUrl: './panel-list-doctors.html',
  styleUrl: './panel-list-doctors.scss'
})
export class PanelListDoctors implements OnInit{
  baseUrl = environment.apiUrl;
  constructor(private service: AdminService, private auth: AuthService){}

  doctors: any[] = [];
  doctorsLink: string = "";

    getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-3.jpg"
}

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
