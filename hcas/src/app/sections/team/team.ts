import { Component } from '@angular/core';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-team',
  imports: [],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team {
  constructor(private adminSer: AdminService){}
  doctors: any[] = []

  getDoctors(){
    this.adminSer.getDoctors().subscribe((res) =>{
      this.doctors = res;
    })
  }

  ngOnInit(): void {
    this.getDoctors();
  }
}
