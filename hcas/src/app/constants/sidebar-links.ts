export const SidebarLinks = {
  admin: [
    {icon: "fa-solid fa-layer-group",  label: 'Dashboard', path: '/admin' },
    {icon: "fa-solid fa-calendar-day", label: 'Appointments', path: '/admin/appointments' },
    {icon: "fa-solid fa-user-doctor", label: 'Doctors', path: '/admin/doctors' },
    {icon: "fa-solid fa-bed-pulse", label: 'Patients', path: '/admin/patients' },
    { icon: "fa-solid fa-file-lines",label: 'Reports', path: '/admin/reports' },
    {icon: "fa-solid fa-gear", label: 'Settings', path: '/admin/settings' },
  ],
  doctor: [
    {icon: "fa-solid fa-layer-group",  label: 'Dashboard', path: '/doctor' },
    {icon: "fa-solid fa-calendar-day", label: 'My Appointments', path: '/doctor/appointments' },
    {icon: "fa-solid fa-bed-pulse", label: 'My Patients', path: '/doctor/patients' },
     {icon: "fa-solid fa-user-doctor", label: 'Doctors', path: '/doctor/doctors' },
    { icon: "fa-solid fa-file-lines",label: 'My Reports', path: '/doctor/reports' },
    { icon: "fa-solid fa-user-check",label: 'My Profile', path: '/doctor/profile' },
    
  ],
  patient: [
    {icon: "fa-solid fa-layer-group",  label: 'Dashboard', path: '/patient' },
    {icon: "fa-solid fa-bed-pulse", label: 'My Appointments', path: '/patient/appointments' },
    {icon: "a-solid fa-file-lines", label: 'My Reports', path: '/patient/reports' },
    {icon: "fa-solid fa-user-doctor", label: 'Doctors', path: '/patient/doctors' },
    {icon: "fa-solid fa-user-check", label: 'My Profile', path: '/patient/profile' },
  ]
};
