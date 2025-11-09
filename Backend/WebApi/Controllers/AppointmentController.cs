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

        // Create new appointment API
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Book(CreateAppointmentDTO dto)
        {
            try
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
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while booking the appointment.", details = ex.Message });
            }
        }

        // Get patient appointments
        [HttpGet("patient")]
        public async Task<ActionResult<IEnumerable<AppointmentDTO>>> GetMyAppointments()
        {
            try
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
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching appointments.", details = ex.Message });
            }
        }

        // Get all appointments for admin
        [HttpGet("all")]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var rawData = await _db.Appointments
                    .Include(a => a.Patient)
                    .Include(a => a.Doctor)
                    .OrderByDescending(a => a.Id)
                    .ToListAsync();

                var data = rawData.Select(a => new AppointmentDTO
                {
                    Id = a.Id,
                    DoctorId = a.DoctorId,  // Correct mapping to the DTO
                    AppointmentDate = a.AppointmentDate,  // Correct mapping to the DTO
                    Status = a.Status,  // Correct mapping to the DTO
                    PatientName = a.Patient?.FullName ?? "Unknown",  // Null-safe for PatientName
                    DoctorName = a.Doctor?.FullName ?? "Unknown",  // Null-safe for DoctorName
                    DoctorImage = a.Doctor?.ProfileImagePath ?? "Unknown",  // Null-safe for DoctorImage
                }).ToList();

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching all appointments.", details = ex.Message });
            }
        }

        // Get single doctor appointments
        [Authorize(Roles = "Doctor")]
        [HttpGet("doctor")]
        public async Task<IActionResult> GetDoctorAppointments()
        {
            try
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
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching doctor's appointments.", details = ex.Message });
            }
        }

        // Admin only: Approve appointment or update the status
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/approve")]
        public async Task<IActionResult> Approve(int id)
        {
            try
            {
                var appt = await _db.Appointments.FindAsync(id);
                if (appt == null) return NotFound();
                appt.Status = AppointmentStatus.Approved;
                await _db.SaveChangesAsync();
                return Ok(new { message = "Doctor appointment was successfully approved." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while approving the appointment.", details = ex.Message });
            }
        }

        // Patients can cancel appointments
        [Authorize(Roles = "Patient")]
        [HttpPut("{id}/cancel")]
        public async Task<IActionResult> CancelAppointment(int id)
        {
            try
            {
                var appt = await _db.Appointments.FindAsync(id);
                if (appt == null) return NotFound();
                appt.Status = AppointmentStatus.Cancelled;
                await _db.SaveChangesAsync();
                return Ok(new { message = "Appointment successfully cancelled!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while cancelling the appointment.", details = ex.Message });
            }
        }

        // Patient can reschedule an appointment
        [Authorize(Roles = "Patient")]
        [HttpPut("{id}/reschedule")]
        public async Task<IActionResult> Reschedule(int id, [FromBody] DateTime newDate)
        {
            try
            {
                var appt = await _db.Appointments.FindAsync(id);
                if (appt == null) return NotFound();
                appt.AppointmentDate = newDate;
                appt.Status = AppointmentStatus.Pending;
                await _db.SaveChangesAsync();
                return Ok(new { message = "Appointment successfully rescheduled" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while rescheduling the appointment.", details = ex.Message });
            }
        }

        // Get approved patients for a doctor
        [Authorize(Roles = "Doctor")]
        [HttpGet("my-approved-patients")]
        public async Task<IActionResult> GetApprovedPatients()
        {
            try
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
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching approved patients.", details = ex.Message });
            }
        }

        // Get only approved appointments for patient
        [HttpGet("approved")]
        public async Task<IActionResult> GetApprovedAppointments()
        {
            try
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
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching approved appointments.", details = ex.Message });
            }
        }
    }
}
