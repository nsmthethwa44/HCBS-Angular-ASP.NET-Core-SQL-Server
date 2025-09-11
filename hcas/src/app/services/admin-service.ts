import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'https://localhost:7197/api/admin';
  
  constructor(private http: HttpClient) {}

  // get all doctors 
  getDoctors(){
    return this.http.get<any[]>(`${this.baseUrl}/get-doctors`);
  }

  getPatients(){
    return this.http.get<any[]>(`${this.baseUrl}/get-patients`)
  }

  // delete a single user 
    deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
