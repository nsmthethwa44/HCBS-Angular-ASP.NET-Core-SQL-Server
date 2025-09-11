import { Component, OnInit} from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { Copyright } from "../../components/copyright/copyright";
import { AuthService } from '../../auth/auth-service';
import { SidebarService } from '../../services/sidebar-service';

@Component({
  selector: 'app-patients-component',
  imports: [RouterOutlet, Sidebar, Copyright],
  templateUrl: './patients-component.html',
  styleUrl: './patients-component.scss'
})
export class PatientsComponent implements OnInit {
  constructor(private auth: AuthService, private sidebarSer: SidebarService){}

    getPatientEmail(){
       const patientEmail = this.auth.getUserEmail();
       return patientEmail;
    }

      getPatientName(){
       const patientName= this.auth.getUserName();
       return patientName;
    }

    ngOnInit(): void {
        this.getPatientEmail();
        this.getPatientName();
    }
  toggleSidebar(){
    this.sidebarSer.toggleSidebar();
  }
}
