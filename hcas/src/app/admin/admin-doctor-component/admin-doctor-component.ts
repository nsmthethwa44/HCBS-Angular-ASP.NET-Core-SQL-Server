import { Component } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { AddDoctorComponent } from '../../components/add-doctor-component/add-doctor-component';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-admin-doctor-component',
  imports: [AddDoctorComponent],
  templateUrl: './admin-doctor-component.html',
  styleUrl: './admin-doctor-component.scss'
})
export class AdminDoctorComponent {
constructor(private adminSer: AdminService){}
doctors: any[] = [];
 addDoctorModal = false;
 baseUrl = environment.apiUrl;

  getImageUrl(path: string){
    return (`${this.baseUrl}/${path}`)
  }
 
   getDoctors(){
    this.adminSer.getDoctors().subscribe((res) =>{
      this.doctors = res;
    })
   }

   ngOnInit() {
  this.getDoctors();
}


 // open add doctor form
    openModal() {
      this.addDoctorModal = !this.addDoctorModal;
   }
}
