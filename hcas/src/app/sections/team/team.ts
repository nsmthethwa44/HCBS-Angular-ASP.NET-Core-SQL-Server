import { Component } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { environment } from '../../../environments/environment';
import { Loader } from '../../components/loader/loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team',
  imports: [Loader, CommonModule],
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
