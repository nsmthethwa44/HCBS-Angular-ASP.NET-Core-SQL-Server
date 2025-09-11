import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth-service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const actualRole = this.auth.getUserRole();
    if (actualRole !== expectedRole) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}



// const routes: Routes = [
//   { path: 'admin', component: AdminDashboardComponent, canActivate: [RoleGuard], data: { role: 'Admin' } },
//   { path: 'doctor', component: DoctorDashboardComponent, canActivate: [RoleGuard], data: { role: 'Doctor' } },
//   { path: 'patient', component: PatientDashboardComponent, canActivate: [RoleGuard], data: { role: 'Patient' } }
// ];
