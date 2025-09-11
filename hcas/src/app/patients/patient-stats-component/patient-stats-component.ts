import { Component, OnInit} from '@angular/core';
import { ReportService } from '../../services/report-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-stats-component',
  imports: [CommonModule],
  templateUrl: './patient-stats-component.html',
  styleUrl: './patient-stats-component.scss'
})
export class PatientStatsComponent implements OnInit {
constructor(private reportSer: ReportService ){}

appointmentStats: any;

getAppointmentStatus(){
  this.reportSer.getPatientAppointmentStats().subscribe({
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
