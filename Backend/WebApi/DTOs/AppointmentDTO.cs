using System.ComponentModel.DataAnnotations;
using WebApi.Models;

namespace WebApi.DTOs
{
    public class CreateAppointmentDTO
    {
        public int DoctorId { get; set; }
        public DateTime AppointmentDate { get; set; }
    }

    public class AppointmentDTO
    {
        public int Id { get; set; }
        public int DoctorId { get; set; } 
        public DateTime AppointmentDate { get; set; }
        public AppointmentStatus Status { get; set; }
        public string PatientName { get; set; } = "";
        public string DoctorName { get; set; } = "";
        public string DoctorImage { get; set; } = "";
    }
}
