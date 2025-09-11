using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public enum AppointmentStatus { Pending, Approved, Completed, Cancelled }

    public class AppointmentModel
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public UserModel Patient { get; set; } = null!;
        public int DoctorId { get; set; }
        public UserModel Doctor { get; set; } = null!;
        public string DoctorEmail { get; set; } = string.Empty;
        public DateTime AppointmentDate { get; set; }
        public AppointmentStatus Status { get; set; }
    }
}
