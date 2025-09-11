export interface Appointment {
  id: number;
  doctorName: string;
  appointmentDate: Date;
  status: string;
  patientName?: string;
  doctorId: number;
  doctorImage?: string;
}

export interface CreateAppointment {
  doctorId: number;
  appointmentDate: string;
}

// @Component({ /* ... */ })
// export class BookAppointmentComponent {
//   doctorName = '';
//   date: string = '';

//   constructor(private service: AppointmentService) {}

//   book() {
//     const data: CreateAppointment = {
//       doctorName: this.doctorName,
//       appointmentDate: this.date
//     };
//     this.service.bookAppointment(data).subscribe(() => alert('Booked.'));
//   }
// }

// @Component({ /* ... */ })
// export class AppointmentsComponent implements OnInit {
//   appointments: Appointment[] = [];

//   constructor(private service: AppointmentService) {}

//   ngOnInit(): void {
//     this.service.getAppointments().subscribe(data => this.appointments = data);
//   }

//   cancel(id: number) {
//     this.service.cancelAppointment(id).subscribe(() => {
//       this.appointments = this.appointments.filter(a => a.id !== id);
//     });
//   }
// }

// @Injectable({ providedIn: 'root' })
// export class AppointmentService {
//   private api = 'https://localhost:5001/api/appointment';

//   constructor(private http: HttpClient) {}

//   bookAppointment(data: CreateAppointment) {
//     return this.http.post(this.api, data);
//   }

//   getAppointments(): Observable<Appointment[]> {
//     return this.http.get<Appointment[]>(this.api);
//   }

//   cancelAppointment(id: number) {
//     return this.http.delete(`${this.api}/${id}`);
//   }
// }
