  import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../models/userModel';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
// import { tap } from 'rxjs/operators';
// import { Router } from '@angular/router'

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private baseUrl = 'https://hcbsapi-gqb6eahuccaufrgh.southafricanorth-01.azurewebsites.net/api/auth';
  
//   constructor(private http: HttpClient, private router: Router) {}

//   login(email: string, password: string) {
//     return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { email, password })
//       .pipe(tap(res => localStorage.setItem('token', res.token)));
//   }

//   register(data: { fullName: string; email: string; password: string }) {
//     return this.http.post(`${this.baseUrl}/register`, data);
//   };

//   logout() {
//     localStorage.removeItem('token');
//     this.router.navigate(['/login']);
//   };

//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('token');
//   }
// }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://hcbsapi-gqb6eahuccaufrgh.southafricanorth-01.azurewebsites.net/api/auth';
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse[]> {
    return this.http.post<AuthResponse[]>(`${this.baseUrl}/login`, { email, password });
  }

// register(data: any) {
//   return this.http.post(`${this.baseUrl}/register`, data);
// }

register(userData: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/register`, userData); 
}


  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  // get a user role from a token
getUserRole(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null; // user role 
  } catch (e) {
    console.error('Token parsing failed', e);
    return null;
  }
}

// get an email from a token 
getUserEmail(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    
    return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || null; // patient email
  } catch (e) {
    console.error('Token parsing failed', e);
    return null;
  }
}

// get a patient from a token
getUserName(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    
    return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || null;// patient name 
  } catch (e) {
    console.error('Token parsing failed', e);
    return null;
  }
}

}
