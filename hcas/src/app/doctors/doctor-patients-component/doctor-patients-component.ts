import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment-service';

@Component({
  selector: 'app-doctor-patients-component',
  imports: [CommonModule],
  templateUrl: './doctor-patients-component.html',
  styleUrl: './doctor-patients-component.scss'
})
export class DoctorPatientsComponent {
  constructor(private appointSer: AppointmentService){}

  date!: number;
  approvedPatients: any[] = [];

loadApprovedPatients(): void {
  this.appointSer.getDoctorApprovedPatients().subscribe(res => {
    this.approvedPatients = res;
  });
}

  getDate() {
    return this.date;
  }

 ngOnInit() {
    this.date = Date.now(); 
    this.loadApprovedPatients();
  }
}
