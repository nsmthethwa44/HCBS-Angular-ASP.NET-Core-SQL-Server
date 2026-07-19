import { Component, OnInit} from '@angular/core';
import { PatientStatsComponent } from "../patient-stats-component/patient-stats-component";
import { ReportService } from '../../services/report-service';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-reports-component',
  imports: [PatientStatsComponent, NgxChartsModule, CommonModule],
  templateUrl: './patient-reports-component.html',
  styleUrl: './patient-reports-component.scss'
})
export class PatientReportsComponent implements OnInit{

  constructor(private reportSer: ReportService){}
  appointmentStatusChart: any[] = [];
  topDoctors: any[] = [];

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

  getAppointmentSummary(){
    this.reportSer.getPatientAppointmentStats().subscribe((res) =>{
    this.appointmentStatusChart = [
        { name: 'Approved', value: res.approved },
        { name: 'Pending', value: res.pending },
        { name: 'Cancelled', value: res.cancelled }
      ];
    })
  }

   getTopDoctors(){
    this.reportSer.getTopDoctors().subscribe((res) =>{
      this.topDoctors = res
    } )
  }

    // top doctors on chart summary 


  ngOnInit() {
  this.getAppointmentSummary();
  this.getTopDoctors();
  }

}
