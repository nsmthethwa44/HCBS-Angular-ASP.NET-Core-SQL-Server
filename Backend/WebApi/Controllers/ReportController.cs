using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class ReportController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ReportController(AppDbContext db) { _db = db; }

        //admin appointments resport count
        [HttpGet("appointments-summary")]
        public async Task<IActionResult> GetAppointmentsSummary()
        {
            var total = await _db.Appointments.CountAsync();
            var approved = await _db.Appointments.CountAsync(a => a.Status == AppointmentStatus.Approved);
            var pending = await _db.Appointments.CountAsync(a => a.Status == AppointmentStatus.Pending);
            var cancelled = await _db.Appointments.CountAsync(a => a.Status == AppointmentStatus.Cancelled);

            return Ok(new
            {
                Total = total,
                Approved = approved,
                Pending = pending,
                Cancelled = cancelled
            });
        }

        //report count doctors & patients
        [HttpGet("users-summary")]
        public async Task<IActionResult> GetUsersSummary()
        {
            var totalDoctors = await _db.Users.CountAsync(u => u.Role == UserRole.Doctor);
            var totalPatients = await _db.Users.CountAsync(u => u.Role == UserRole.Patient);

            return Ok(new
            {
                Doctors = totalDoctors,
                Patients = totalPatients
            });
        }

        // top performing doctors
        [HttpGet("top-doctors")]
        public async Task<IActionResult> GetTopDoctors()
        {
            var topDoctors = await _db.Appointments
                .Where(a => a.Status == AppointmentStatus.Approved)
                .GroupBy(a => a.DoctorId)
                .Select(g => new
                {
                    DoctorId = g.Key,
                    Count = g.Count()
                })
                .OrderByDescending(g => g.Count)
                .Take(5)
                .ToListAsync();

            var result = topDoctors.Select(d => new
            {
                d.DoctorId,
                d.Count,
                DoctorName = _db.Users.Where(u => u.Id == d.DoctorId).Select(u => u.FullName).FirstOrDefault(),
                DoctorImage = _db.Users.Where(u => u.Id == d.DoctorId).Select(u => u.ProfileImagePath).FirstOrDefault()
            });

            return Ok(result);
        }

        // get patient stats summary
        [Authorize(Roles = "Patient")]
        [HttpGet("patient-appointments-summary")]
        public async Task<IActionResult> GetPatientAppointmentsSummary()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized("User ID not found in token.");

            var patientId = int.Parse(userIdClaim.Value);

            var total = await _db.Appointments.CountAsync(a => a.PatientId == patientId);
            var approved = await _db.Appointments.CountAsync(a => a.PatientId == patientId && a.Status == AppointmentStatus.Approved);
            var pending = await _db.Appointments.CountAsync(a => a.PatientId == patientId && a.Status == AppointmentStatus.Pending);
            var cancelled = await _db.Appointments.CountAsync(a => a.PatientId == patientId && a.Status == AppointmentStatus.Cancelled);

            return Ok(new
            {
                Total = total,
                Approved = approved,
                Pending = pending,
                Cancelled = cancelled
            });
        }

        // get doctor stats summary
        [Authorize(Roles = "Doctor")]
        [HttpGet("doctor-appointments-summary")]
        public async Task<IActionResult> GetDoctorAppointmentsSummary()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized("User ID not found in token.");

            var doctorId = int.Parse(userIdClaim.Value);

            var total = await _db.Appointments.CountAsync(a => a.DoctorId == doctorId);
            var approved = await _db.Appointments.CountAsync(a => a.DoctorId == doctorId && a.Status == AppointmentStatus.Approved);
            var pending = await _db.Appointments.CountAsync(a => a.DoctorId == doctorId && a.Status == AppointmentStatus.Pending);
            var cancelled = await _db.Appointments.CountAsync(a => a.DoctorId == doctorId && a.Status == AppointmentStatus.Cancelled);

            return Ok(new
            {
                Total = total,
                Approved = approved,
                Pending = pending,
                Cancelled = cancelled
            });
        }


    }
}
