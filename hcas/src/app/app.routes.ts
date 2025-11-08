import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { AdminComponent } from './admin/admin-component/admin-component';
import { AdminAppointmentsComponent } from './admin/admin-appointments-component/admin-appointments-component';
import { AdminReportsComponent } from './admin/admin-reports-component/admin-reports-component';
import { DoctorsComponent } from './doctors/doctors-component/doctors-component';
import { DoctorAppointmentsComponent } from './doctors/doctor-appointments-component/doctor-appointments-component';
import { DoctorPatientsComponent } from './doctors/doctor-patients-component/doctor-patients-component';
import { DoctorReportsComponent } from './doctors/doctor-reports-component/doctor-reports-component';
import { DoctorProfileComponent } from './doctors/doctor-profile-component/doctor-profile-component';
import { PatientsComponent } from './patients/patients-component/patients-component';
import { BookAppointmentComponent } from './patients/book-appointment-component/book-appointment-component';
import { PatientAppointmentsComponent } from './patients/patient-appointments-component/patient-appointments-component';
import { PatientReportsComponent } from './patients/patient-reports-component/patient-reports-component';
import { PatientProfileComponent } from './patients/patient-profile-component/patient-profile-component';
import { AdminDashboardComponent } from './admin/admin-dashboard-component/admin-dashboard-component';
import { DoctorDashboardComponent } from './doctors/doctor-dashboard-component/doctor-dashboard-component';
import { PatientDashboardComponent } from './patients/patient-dashboard-component/patient-dashboard-component';
import { Home } from './pages/home/home';
import { LandingPage } from './pages/landing-page/landing-page';
import { About } from './pages/about/about';
import { AuthGuard } from './auth/auth-guard'; 
import { PatientDoctorsComponent } from './patients/patient-doctors-component/patient-doctors-component';
import { AdminDoctorComponent } from './admin/admin-doctor-component/admin-doctor-component';
import { AdminPatientComponent } from './admin/admin-patient-component/admin-patient-component';
import { Services } from './pages/services/services';
import { Team } from './pages/team/team';
import { Blog } from './pages/blog/blog';
import { Contacts } from './pages/contacts/contacts';
import { Register } from './auth/register/register';

export const routes: Routes = [
{
    path: 'admin',
    component: AdminComponent, canActivate: [AuthGuard], data: { role: 'Admin' },
    children: [
      { path: '', component:AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'Admin' }},
      { path: 'appointments', component:AdminAppointmentsComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
      { path: 'doctors', component: AdminDoctorComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
      { path: 'patients', component: AdminPatientComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
      { path: 'reports', component: AdminReportsComponent,  canActivate: [AuthGuard], data: { role: 'Admin' }},
      { path: 'settings', component: AdminReportsComponent, canActivate: [AuthGuard], data: { role: 'Admin' }},
    ]
  },
  {
    path: 'doctor',
    component: DoctorsComponent, canActivate: [AuthGuard], data: { role: 'Doctor' },
    children: [
      { path: '', component: DoctorDashboardComponent, canActivate: [AuthGuard], data: { role: 'Doctor' } },
      { path: 'appointments', component: DoctorAppointmentsComponent, canActivate: [AuthGuard], data: { role: 'Doctor' } },
      { path: 'patients', component:DoctorPatientsComponent, canActivate: [AuthGuard], data: { role: 'Doctor' } },
      { path: 'reports', component: DoctorReportsComponent, canActivate: [AuthGuard], data: { role: 'Doctor' } },
      { path: 'profile', component: DoctorReportsComponent, canActivate: [AuthGuard], data: { role: 'Doctor' } },
        { path: 'doctors', component: PatientDoctorsComponent, canActivate: [AuthGuard], data: { role: 'Doctor' } },
    ]
  },
  {
    path: 'patient',
    component: PatientsComponent, canActivate: [AuthGuard], data: { role: 'Patient' },
    children: [
      { path: '', component: PatientDashboardComponent, canActivate: [AuthGuard], data: { role: 'Patient' } },
      { path: 'appointments', component: BookAppointmentComponent, canActivate: [AuthGuard], data: { role: 'Patient' } },
      { path: 'reports', component: PatientReportsComponent, canActivate: [AuthGuard], data: { role: 'Patient' } },
      { path: 'profile', component: PatientReportsComponent, canActivate: [AuthGuard], data: { role: 'Patient' } },
      { path: 'doctors', component: PatientDoctorsComponent, canActivate: [AuthGuard], data: { role: 'Patient' } },
    ]
  },
    { path: '', component: Home,
      children:[
        {path: "", component: LandingPage},
        {path: "about", component: About},
        {path: "services", component: Services},
        {path: "team", component: Team},
        {path: "blog", component: Blog},
        {path: "contact", component: Contacts},
    ]
    },
  { path: 'login', component: Login} ,
  { path: 'register', component: Register} ,
  {path: "**", redirectTo: "/"},
  
];
