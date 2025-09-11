import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment-service';
import { PatientStatsComponent } from "../patient-stats-component/patient-stats-component";
import { PanelListDoctors } from "../../components/panel-list-doctors/panel-list-doctors";

@Component({
  selector: 'app-patient-dashboard-component',
  imports: [RouterLink, CommonModule, PatientStatsComponent, PanelListDoctors],
  templateUrl: './patient-dashboard-component.html',
  styleUrl: './patient-dashboard-component.scss'
})
export class PatientDashboardComponent {
   constructor( private appointSer: AppointmentService){};

  appointments: any[] = [];
  date!: number;
  upcomingAppointments: any[] = []; // as approved appointments

  getApproved(){
     this.appointSer.getApprovedAppointments().subscribe(res => {
    this.upcomingAppointments = res;
  });
  }


  getAppointments(){
      this.appointSer.getPatientAppointments().subscribe((res) =>{
        this.appointments = res
        console.log(res)
      })
    }

ngOnInit() {
  this.getAppointments();
  this.date = Date.now(); 
  this.getApproved();
}

 getDate() {
    return this.date;
  }

getStatusText(status: number): string {
    switch (status) {
      case 0: return 'Pending';
      case 1: return 'Approved';
      case 3: return 'Cancelled';
      default: return 'Unknown';
    }
}

    getStatusClass(status: number): string {
      switch (status) {
        case 0: return 'status-pending';
        case 1: return 'status-approved';
        case 3: return 'status-cancelled';
        default: return '';
      }
    }


}
