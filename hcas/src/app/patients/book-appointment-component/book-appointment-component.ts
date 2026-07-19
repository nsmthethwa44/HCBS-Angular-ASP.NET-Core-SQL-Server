import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin-service';
import { AppointmentService } from '../../services/appointment-service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-appointment-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './book-appointment-component.html',
  styleUrl: './book-appointment-component.scss'
})
export class BookAppointmentComponent implements OnInit {

  form: FormGroup;
  doctors: any[] = [];
  appointments: any[] = [];
  selectedStatus: string = '';
  searchTerm = '';
  currentPage = 1;
  pageSize = 7;

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

  constructor(private fb: FormBuilder, private http: HttpClient, private service: AdminService, private appointSer: AppointmentService){
    this.form = this.fb.group({
      doctorId: ['', Validators.required],
      appointmentDate: ['', Validators.required]
    });
  }

    getDoctors() {
    this.service.getDoctors().subscribe((res) =>{
      this.doctors = res;
    })
    }

    getAppointments(){
      this.appointSer.getPatientAppointments().subscribe((res) =>{
        this.appointments = res
      })
    }

    ngOnInit() {
      this.getDoctors();
      this.getAppointments();
    }

  submitAppointment() {
    if (this.form.invalid) return;
    const data = {
      doctorId: this.form.value.doctorId,
      appointmentDate: this.form.value.appointmentDate
    };
     Swal.fire({
    title: 'Booking Appointment...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });
    this.appointSer.bookAppointment(data).subscribe({
        next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Booking Successful',
          text: 'Your Appointment successfully Booked!',
          timer: 1800,
          showConfirmButton: false
        });
        this.getAppointments();
      },
      error: (error) => {
        console.error(error);
        Swal.fire('Error', 'Failed to book appointment', 'error');
      }
    })
  }

  cancelAppointments(id: number){
         Swal.fire({
          title: 'Are you sure you want to cancel this appointment?',
          text: 'This action cannot be undone!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, cancel appointment!'
      }).then((res) =>{
        if(res.isConfirmed){
            Swal.fire({
              title: 'Cancelling Appointment...',
              allowOutsideClick: false,
              didOpen: () => Swal.showLoading()
            });
          this.appointSer.cancelAppointment(id).subscribe(() =>{
              Swal.fire({
                icon: 'success',
                title: 'Cancel Successful',
                text: 'Appointment successfully cancelled!',
                timer: 1800,
                showConfirmButton: false
              });
             this.getAppointments();
          })
        }
      }).catch((error) =>{
        Swal.fire("Error", 'Failed to cancel appointment', 'error');
          console.error(error);
      })
  }
  date(){
    const date = Date.now();
    return date;
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

    // download appointments 
    onDownload() {
    this.appointSer.downloadPdf();
  }
    
}