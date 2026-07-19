import { Component } from '@angular/core';
import { DoctorStatsComponent } from "../doctor-stats-component/doctor-stats-component";
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report-service';
import { NgxChartsModule} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-doctor-reports-component',
  imports: [DoctorStatsComponent, CommonModule, NgxChartsModule],
  templateUrl: './doctor-reports-component.html',
  styleUrl: './doctor-reports-component.scss'
})
export class DoctorReportsComponent {
  constructor(private reportSer: ReportService) {}
   stats: any = {}; 
  appointmentStatsBar: any[] = [];
  appointmentStatsPie: any[] = [];
   topDoctors: any[] = [];

  colorScheme = {
    domain: ['#28a745', '#ffc107', '#dc3545']
  };

    getTopDoctors(){
    this.reportSer.getTopDoctors().subscribe((res) =>{
      this.topDoctors = res
    } )
  }


  loadStats(): void {
    this.reportSer.getDoctorAppointmentStats().subscribe({
      next: (res) => {
        this.stats = res;

        this.appointmentStatsBar = [
          { name: 'Approved', value: res.approved },
          { name: 'Pending', value: res.pending },
          { name: 'Cancelled', value: res.cancelled }
        ];

        this.appointmentStatsPie = [...this.appointmentStatsBar]; 
      },
      error: (err) => {
        console.error('Failed to load stats', err);
      }
    });
  }

  ngOnInit(): void {
    this.loadStats();
     this.getTopDoctors();
  }

 view: [number, number] = [700, 220];

customColors = (name: string): string => {
  const colors = [ '#E74C3C',  '#dab201',  '#007B83', ];
  const index = Math.abs(this.hashCode(name)) % colors.length;
  return colors[index];
};

hashCode(str: string): number {
  return str.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
}

 appointmentLineData = [
  {
    name: 'Approved',
    series: [
      { name: 'Week 1', value: 8 },
      { name: 'Week 2', value: 10 },
      { name: 'Week 3', value: 7 }
    ]
  },
  {
    name: 'Pending',
    series: [
      { name: 'Week 1', value: 2 },
      { name: 'Week 2', value: 1 },
      { name: 'Week 3', value: 3 }
    ]
  },
  {
    name: 'Cancelled',
    series: [
      { name: 'Week 1', value: this.stats.cancelled },
      { name: 'Week 2', value: this.stats.cancelled },
      { name: 'Week 3', value: this.stats.cancelled }
    ]
  }
];


}
