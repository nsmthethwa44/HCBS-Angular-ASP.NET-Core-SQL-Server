import { Component } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { Reviews } from "../../sections/reviews/reviews";
import { Cta } from "../../sections/cta/cta";

@Component({
  selector: 'app-team',
  imports: [Reviews, Cta],
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
