import { Component } from '@angular/core';
import { ReportService } from '../../services/report-service';

@Component({
  selector: 'app-doctor-stats-component',
  imports: [],
  templateUrl: './doctor-stats-component.html',
  styleUrl: './doctor-stats-component.scss'
})
export class DoctorStatsComponent {
  constructor(private reportSer: ReportService){}

appointmentStats: any;

getAppointmentStatus(){
  this.reportSer.getDoctorAppointmentStats().subscribe({
      next: (res) => {
        this.appointmentStats = res;
      },
      error: (error) => {
        console.error('Error fetching patient stats:', error);
      }
    });
  }

  ngOnInit(): void {
    this.getAppointmentStatus();
  }
}
