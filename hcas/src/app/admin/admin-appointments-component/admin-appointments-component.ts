import { Component } from '@angular/core';
import { Appointment } from '../../models/AppointmentModel';
import { AppointmentService } from '../../services/appointment-service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin-appointments-component',
   imports: [CommonModule, FormsModule],
  templateUrl: './admin-appointments-component.html',
  styleUrl: './admin-appointments-component.scss'
})
export class AdminAppointmentsComponent  implements OnInit{
  
  appointments: any[] = [];
  selectedStatus: string = '';
  searchTerm = '';
  currentPage = 1;
  pageSize = 12;

  // pagination, search and filter
get filteredAppointments(): any[] {
  return this.appointments
    .filter(item => {
      if (this.selectedStatus) {
        return this.getStatusText(item.status).toLowerCase() === this.selectedStatus.toLowerCase();
      }
      return true;
    })
    .filter(item => {
      if (this.searchTerm) {
        return item.doctorName.toLowerCase().includes(this.searchTerm.toLowerCase());
      }
      return true;
    });
}

    get totalPages(): number {
      return Math.ceil(this.filteredAppointments.length / this.pageSize);
    }

    get pagedAppointments(): any[] {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredAppointments.slice(start, start + this.pageSize);
    }

    nextPage(): void {
      if (this.currentPage < this.totalPages) this.currentPage++;
    }

    prevPage(): void {
      if (this.currentPage > 1) this.currentPage--;
    }
  // end search and pagination filter 


  constructor(private appointSer: AppointmentService) {}

  getAllAppointments(){
  this.appointSer.getAllAppointments().subscribe((res) =>{
    this.appointments = res;
  })
}

ngOnInit(): void {
this.getAllAppointments();
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
// approve appointment 
}
