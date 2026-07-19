import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateAppointment, Appointment } from '../models/AppointmentModel';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private baseUrl = environment.apiUrl + '/appointment';

  constructor(private http: HttpClient) {}

  bookAppointment(data: CreateAppointment) {
    return this.http.post(`${this.baseUrl}`, data);
  }

  getPatientAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/patient`);
  }

  deleteAppointment(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}/delete`);
  }

  getDoctorAppointments() {
  return this.http.get<Appointment[]>(`${this.baseUrl}/doctor`);
}

getAllAppointments() {
  return this.http.get<Appointment[]>(`${this.baseUrl}/all`);
}

approveAppointment(id: number) {
  return this.http.put(`${this.baseUrl}/${id}/approve`, {});
}

cancelAppointment(id: number) {
  return this.http.put(`${this.baseUrl}/${id}/cancel`, {});
}

reschedule(id: number, newDate: Date) {
  return this.http.put(`${this.baseUrl}/${id}/reschedule`, newDate);
}

getApprovedAppointments(): Observable<Appointment[]> {
  return this.http.get<Appointment[]>(`${this.baseUrl}/approved`);
}

getDoctorApprovedPatients() {
  return this.http.get<any[]>(`${this.baseUrl}/my-approved-patients`);
}


// download patient appointments 
downloadPdf(): void {
  this.http.get(`${this.baseUrl}/download-all`, { responseType: 'blob' }).subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Appointments.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error: async (err) => {
      const errorText = await err.error.text(); // decode plain-text error
      console.error('Download failed:', errorText);
    }
  });
}


}


// this.auth.login(email, pass).subscribe(res => {
//   this.auth.storeToken(res.token);
//   const role = this.auth.getUserRole();
//   this.router.navigate([`/dashboard/${role.toLowerCase()}`]);
// });