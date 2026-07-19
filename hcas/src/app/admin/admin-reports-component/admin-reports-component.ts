import { Component, OnInit } from '@angular/core';
import { StatsComponent } from "../../components/stats-component/stats-component";
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report-service';

@Component({
  selector: 'app-admin-reports-component',
  standalone: true,
  imports: [StatsComponent, CommonModule, NgxChartsModule],
  templateUrl: './admin-reports-component.html',
  styleUrl: './admin-reports-component.scss'
})
export class AdminReportsComponent implements OnInit {
  constructor(private reportSer: ReportService) {}

  appointmentSummaryChart: any[] = [];
  topDoctorsChart: any[] = [];
  topDoctors: any[] = [];
  userSummaryChart: any[] = [];

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


  showLegend = true;
  showLabels = true;
  isDoughnut = false;

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

// appointments chart summary 
  loadAppointmentSummary() {
    this.reportSer.getAppointmentSummary().subscribe(res => {
      this.appointmentSummaryChart = [
        { name: 'Approved', value: res.approved },
        { name: 'Pending', value: res.pending },
        { name: 'Cancelled', value: res.cancelled }
      ];
    });
  }

  getTopDoctors(){
    this.reportSer.getTopDoctors().subscribe((res) =>{
      this.topDoctors = res
    } )
  }

  ngOnInit(): void {
    this.loadAppointmentSummary();
    this.loadTopDoctors();
    this.getTopDoctors();
    this.loadUserSummary();
  }
}
