import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { Copyright } from "../../components/copyright/copyright";
import { AuthService } from '../../auth/auth-service';
import { SidebarService } from '../../services/sidebar-service';

@Component({
  selector: 'app-doctors-component',
  imports: [RouterOutlet, Sidebar, Copyright],
  templateUrl: './doctors-component.html',
  styleUrl: './doctors-component.scss'
})
export class DoctorsComponent {
  constructor(private auth: AuthService, private sidebarSer: SidebarService){}

    getDoctorEmail(){
       const doctorEmail = this.auth.getUserEmail();
       return doctorEmail;
    }

      getDoctorName(){
       const doctorName= this.auth.getUserName();
       return doctorName;
    }

    ngOnInit(): void {
        this.getDoctorEmail();
        this.getDoctorName();
    }

      toggleSidebar(){
    this.sidebarSer.toggleSidebar();
  }
}
