import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../services/admin-service';
import { AppointmentService } from '../../services/appointment-service';
import { StatsComponent } from "../../components/stats-component/stats-component";
import { RouterLink } from '@angular/router';
import { PanelListDoctors } from "../../components/panel-list-doctors/panel-list-doctors";
import Swal from 'sweetalert2'
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { ReportService } from '../../services/report-service';


@Component({
  selector: 'app-admin-dashboard-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, StatsComponent, RouterLink, PanelListDoctors, NgxChartsModule],
  templateUrl: './admin-dashboard-component.html',
  styleUrl: './admin-dashboard-component.scss'
})
export class AdminDashboardComponent {

 constructor(private http: HttpClient, private service: AdminService, private appointSer: AppointmentService, private reportSer: ReportService) {}

  doctors: any[] = [];
  patients: any[] = [];
  appointments: any[] = [];
  appointmentSummaryChart: any[] = [];
  topDoctorsChart: any[] = [];
  topDoctors: any[] = []
  userSummaryChart: any[] = [];
  date!: number;

    // chart options
  view: [number, number] = [700, 220];

customColors = (name: string): string => {
  const colors = [ '#E74C3C',  '#dab201',  '#007B83', ];
  const index = Math.abs(this.hashCode(name)) % colors.length;
  return colors[index];
};

hashCode(str: string): number {
  return str.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
}
// get all doctors from the database 
getDoctors() {
this.service.getDoctors().subscribe((res) =>{
  this.doctors = res;
})
}

// get patients 
getPatients() {
  this.service.getPatients().subscribe((res) =>{
    this.patients = res;
  })
}

getAllAppointments(){
  this.appointSer.getAllAppointments().subscribe((res) =>{
    this.appointments = res;
  })
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
         this.getAllAppointments();
      })
    }
  }).catch((error) =>{
    Swal.fire("Error", 'Failed to approve appointment', 'error');
      console.error(error);
  })
}

  // top doctors on chart summary 
loadTopDoctors() {
  this.reportSer.getTopDoctors().subscribe(res => {
    this.topDoctorsChart = res.map(doc => ({
      name: "Dr." + doc.doctorName,
      value: doc.count
    }));
  });
}

// display patients & doctors summary on a chart 
loadUserSummary() {
  this.reportSer.getUserSummary().subscribe(res => {
    this.userSummaryChart = [
      { name: 'Doctors', value: res.doctors },
      { name: 'Patients', value: res.patients }
    ];
  });
}

 getTopDoctors(){
    this.reportSer.getTopDoctors().subscribe((res) =>{
      this.topDoctors = res
    } )
  }

ngOnInit() {
  this.getDoctors();
  this.getPatients();
  this.getAllAppointments();
  this.date = Date.now(); 
  this.loadTopDoctors();
  this.getTopDoctors();
  this.loadUserSummary();
}

 getDate() {
    return this.date;
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
      this.service.deleteUser(id).subscribe(() =>{
        Swal.fire('Success', 'Patients successfully deleted!', 'success')
         this.getPatients();
      })
    }
  }).catch((error) =>{
    Swal.fire("Error", 'Failed to delete patient', 'error');
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


  // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }

 // approve(id: number) {
  //   this.service.approveAppointment(id).subscribe(() => {
  //     this.appointments = this.appointments.map(a => a.id === id ? { ...a, status: 'Approved' } : a);
  //   });
  // }