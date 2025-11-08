import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
    private baseUrl = environment.apiUrl + '/report';
    constructor(private http: HttpClient) {}

    getAppointmentSummary() {
    return this.http.get<{ total: number; approved: number; pending: number; cancelled: number }>(
      `${this. baseUrl}/appointments-summary`
    );
}

  getUserSummary() {
    return this.http.get<{ doctors: number; patients: number }>(`${this. baseUrl}/users-summary`);
  }

  getTopDoctors() {
    return this.http.get<Array<{ doctorId: number; doctorName: string; count: number, doctorImage: string }>>(
      `${this.baseUrl}/top-doctors`
    );
  }

  // patient appointments summary 
  getPatientAppointmentStats(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/patient-appointments-summary`);
}

  // doctor appointments summary 
    getDoctorAppointmentStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/doctor-appointments-summary`);
  }

}
