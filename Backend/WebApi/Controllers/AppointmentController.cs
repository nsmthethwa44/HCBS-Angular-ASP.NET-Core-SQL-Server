using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Security.Claims;
using System.Text;
using WebApi.Data;
using WebApi.DTOs;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly AppDbContext _db;
        public AppointmentController(AppDbContext db) => _db = db;

        //create new appointment api
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Book(CreateAppointmentDTO dto)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var patient = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (patient == null) return Unauthorized("Invalid patient");

            var doctor = await _db.Users.FirstOrDefaultAsync(u => u.Id == dto.DoctorId && u.Role == UserRole.Doctor);
            if (doctor == null) return BadRequest("Doctor not found");

            var appointment = new AppointmentModel
            {
                DoctorId = doctor.Id,
                AppointmentDate = dto.AppointmentDate,
                Status = AppointmentStatus.Pending,
                PatientId = patient.Id
            };

            _db.Appointments.Add(appointment);
            await _db.SaveChangesAsync();
            return Ok(new { message = "Appointment booked!" });
        }


        //get patient appointments 
        [HttpGet("patient")]
        public async Task<ActionResult<IEnumerable<AppointmentDTO>>> GetMyAppointments()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var patient = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (patient == null)
                return Unauthorized("User not found or not logged in.");

            var appointments = await _db.Appointments
                .Where(a => a.PatientId == patient.Id)
                .Include(a => a.Doctor) // Required to join with Doctor
                .OrderByDescending(d => d.Id)
                .Select(a => new AppointmentDTO
                {
                    Id = a.Id,
                    DoctorId = a.DoctorId,
                    AppointmentDate = a.AppointmentDate,
                    Status = a.Status,
                    DoctorName = a.Doctor.FullName,
                    DoctorImage = a.Doctor.ProfileImagePath ?? string.Empty
                })
                .ToListAsync();

            return Ok(appointments);
        }


        // get all appointments for admin
        [Authorize(Roles = "Admin")]
        [HttpGet("all")]
        public async Task<ActionResult> GetAll()
        {
            var rawData = await _db.Appointments
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .OrderByDescending(a => a.Id)
                .ToListAsync();

            var data = rawData.Select(a => new AppointmentDTO
            {
                Id = a.Id,
                DoctorId = a.DoctorId,
                AppointmentDate = a.AppointmentDate,
                Status = a.Status,
                PatientName = a.Patient?.FullName ?? "Unknown",
                DoctorName = a.Doctor?.FullName ?? "Unknown",
                DoctorImage = a.Doctor?.ProfileImagePath ?? "Unknown",
            });

            return Ok(data);
        }


        // get single doctor appointments
        [Authorize(Roles = "Doctor")]
        [HttpGet("doctor")]
        public async Task<IActionResult> GetDoctorAppointments()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var doctor = await _db.Users.FirstOrDefaultAsync(u => u.Email == email && u.Role == UserRole.Doctor);
            if (doctor == null) return Unauthorized();
            var appointments = await _db.Appointments
                .Where(a => a.DoctorId == doctor.Id)
                .Include(a => a.Patient)
                .OrderByDescending(d => d.Id)
                .ToListAsync();

            var data = appointments.Select(a => new AppointmentDTO
            {
                Id = a.Id,
                DoctorId = a.DoctorId,
                AppointmentDate = a.AppointmentDate,
                Status = a.Status,
                PatientName = a.Patient?.FullName ?? "Unknown",
                DoctorName = a.Doctor?.FullName ?? "Unknown"
            });
            return Ok(data);
        }

        // admin only should approve appointment or update the status
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/approve")]
        public async Task<IActionResult> Approve(int id)
        {
            var appt = await _db.Appointments.FindAsync(id);
            if (appt == null) return NotFound();
            appt.Status = AppointmentStatus.Approved;
            await _db.SaveChangesAsync();
            return Ok( new { message = "Doctor appointment was successfully approved." });
        }

        // patients can cancel appointments
        [Authorize(Roles = "Patient")]
        [HttpPut("{id}/cancel")]
        public async Task<IActionResult> CancelAppointment(int id)
        {
            var appt = await _db.Appointments.FindAsync(id);
            if (appt == null) return NotFound();
            appt.Status = AppointmentStatus.Cancelled;
            await _db.SaveChangesAsync();
            return Ok( new {message = "Appointment successfully cancelled!"});
        }

        // patient can reschedule an appointment
        [Authorize(Roles = "Patient")]
        [HttpPut("{id}/reschedule")]
        public async Task<IActionResult> Reschedule(int id, [FromBody] DateTime newDate)
        {
            var appt = await _db.Appointments.FindAsync(id);
            if (appt == null) return NotFound();
            appt.AppointmentDate = newDate;
            appt.Status = AppointmentStatus.Pending;
            await _db.SaveChangesAsync();
            return Ok(new { message = "Appointment successfully rescheduled" });
        }

        [Authorize(Roles = "Doctor")]
        [HttpGet("my-approved-patients")]
        public async Task<IActionResult> GetApprovedPatients()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized("Doctor ID not found in token.");

            var doctorId = int.Parse(userIdClaim.Value);

            var approvedPatients = await _db.Appointments
                .Where(a => a.DoctorId == doctorId && a.Status == AppointmentStatus.Approved)
                .Select(a => a.PatientId)
                .Distinct()
                .Join(_db.Users, pid => pid, u => u.Id, (pid, patient) => new
                {
                    patient.Id,
                    patient.FullName,
                    patient.Email,
                    patient.ProfileImagePath
                })
                .ToListAsync();

            return Ok(approvedPatients);
        }


        // get only approved appointments patient only 
        [HttpGet("approved")]
        public async Task<IActionResult> GetApprovedAppointments()
        {
            var email = User.FindFirstValue(ClaimTypes.Email); 
            var patient = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (patient == null)
                return Unauthorized();

            var appointments = await _db.Appointments
                .Where(a => a.PatientId == patient.Id && a.Status == AppointmentStatus.Approved)
                .Include(a => a.Doctor)
                .OrderByDescending(d => d.Id)
                .ToListAsync();

            var result = appointments.Select(a => new {
                a.Id,
                a.AppointmentDate,
                a.Status,
                doctorName = a.Doctor.FullName,
                doctorImage = a.Doctor.ProfileImagePath,
                patientName = patient.FullName
            });

            return Ok(result);
        }
    }

}
