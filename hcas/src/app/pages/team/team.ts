import { Component } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { Reviews } from "../../sections/reviews/reviews";
import { Cta } from "../../sections/cta/cta";
import { Loader } from "../../components/loader/loader";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-team',
  imports: [Reviews, Cta, Loader],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team {
  constructor(private adminSer: AdminService){}
  doctors: any[] = []
  baseUrl = environment.apiUrl;

  getDoctors(){
    this.adminSer.getDoctors().subscribe((res) =>{
      this.doctors = res;
    })
  }

  ngOnInit(): void {
    this.getDoctors();
  }

   getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-3.jpg"
}
}
