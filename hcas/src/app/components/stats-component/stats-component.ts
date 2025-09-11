import { Component} from '@angular/core';
import { ReportService } from '../../services/report-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-component',
  imports: [CommonModule],
  templateUrl: './stats-component.html',
  styleUrl: './stats-component.scss'
})
export class StatsComponent{
  constructor(private reportSer: ReportService){}

  appointmentSummary: any;
  topDoctors: any[] = [];
  userSummary: any;

  getAppointmentSummary(){
  this.reportSer.getAppointmentSummary().subscribe(res => {
      this.appointmentSummary = res;
    });
  }

  getTopDoctors(){
    this.reportSer.getTopDoctors().subscribe(res => {
      this.topDoctors = res;
    });
  }

  getUserSummary(){
  this.reportSer.getUserSummary().subscribe(res => {
      this.userSummary = res;
    });
  }

ngOnInit() {
 this.getAppointmentSummary();
 this.getTopDoctors();
 this.getUserSummary();
}


}
