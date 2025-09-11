import { Component } from '@angular/core';
import { Appointment } from '../../models/AppointmentModel';
import { CommonModule } from '@angular/common';
import { DoctorStatsComponent } from "../doctor-stats-component/doctor-stats-component";
import { AppointmentService } from '../../services/appointment-service';
import { PanelListDoctors } from '../../components/panel-list-doctors/panel-list-doctors';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard-component',
  imports: [CommonModule, DoctorStatsComponent, PanelListDoctors, RouterLink],
  templateUrl: './doctor-dashboard-component.html',
  styleUrl: './doctor-dashboard-component.scss'
})
export class DoctorDashboardComponent {
  constructor(private appointSer: AppointmentService){}
  date!: number;
  appointments: any[] = [];

  getDate() {
    return this.date;
  }

  getDoctorAppointments() {
    this.appointSer.getDoctorAppointments().subscribe(data => this.appointments = data);
  }

  ngOnInit() {
    this.date = Date.now(); 
    this.getDoctorAppointments();
  }

  getApproveAppointment(id: number){
    Swal.fire({
      title: 'Are you sure, you want to approve this appointment?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve appointment!'
    }).then((res) =>{
      if(res.isConfirmed){
        this.appointSer.approveAppointment(id).subscribe(() =>{
          Swal.fire('Success', 'Appointment successfully approved!', 'success')
           this.getDoctorAppointments();
        })
      }
    }).catch((error) =>{
      Swal.fire("Error", 'Failed to approve appointment', 'error');
        console.error(error);
    })
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
