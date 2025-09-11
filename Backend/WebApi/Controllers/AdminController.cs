using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.DTOs;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _db;

        public AdminController(AppDbContext db)
        {
            _db = db;
        }
       
        // create new doctor
        [HttpPost("create-doctor")]
        public async Task<IActionResult> CreateDoctor([FromForm] DoctorCreateRequest request)
        {
            if (_db.Users.Any(u => u.Email == request.Email))
                return BadRequest("Email already in use.");

            if (request.ProfileImage == null)
                return BadRequest("Profile image is required.");

            var imageFileName = $"{Guid.NewGuid()}_{request.ProfileImage.FileName}";
            var savePath = Path.Combine("wwwroot/images", imageFileName);

            using (var stream = new FileStream(savePath, FileMode.Create))
            {
                await request.ProfileImage.CopyToAsync(stream);
            }

            var doctor = new UserModel
            {
                FullName = request.FullName,
                Email = request.Email,
                Role = UserRole.Doctor,
                ProfileImagePath = $"/images/{imageFileName}",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("12345")
            };

            _db.Users.Add(doctor);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Doctor created successfully" });
        }

        // create new doctor
        [HttpPost("create-admin")]
        public async Task<IActionResult> Createadmin([FromForm] AdminCreateRequest request)
        {
            if (_db.Users.Any(u => u.Email == request.Email))
                return BadRequest("Email already in use.");

            if (request.ProfileImage == null)
                return BadRequest("Profile image is required.");

            var imageFileName = $"{Guid.NewGuid()}_{request.ProfileImage.FileName}";
            var savePath = Path.Combine("wwwroot/images", imageFileName);

            using (var stream = new FileStream(savePath, FileMode.Create))
            {
                await request.ProfileImage.CopyToAsync(stream);
            }

            var admin = new UserModel
            {
                FullName = request.FullName,
                Email = request.Email,
                Role = UserRole.Admin,
                ProfileImagePath = $"/images/{imageFileName}",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("12345")
            };

            _db.Users.Add(admin);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Admin created successfully" });
        }

        // get all doctors method 
        [HttpGet("get-doctors")]
        public async Task<IActionResult> GetDoctors()
        {
            var doctors = await _db.Users
                .Where(u => u.Role == UserRole.Doctor)
                .OrderByDescending(d => d.Id)
                .Select(d => new
                {
                    d.Id,
                    d.FullName,
                    d.Email,
                    d.ProfileImagePath
                })
                .ToListAsync();

            return Ok(doctors);
        }

        // create new patient
        [HttpPost("create-patient")]
        public async Task<IActionResult> CreatePatient(PatientCreateRequest request)
        {
            if (_db.Users.Any(u => u.Email == request.Email))
                return BadRequest("Email already in use.");

            var patient = new UserModel
            {
                FullName = request.FullName,
                Email = request.Email,
                Role = UserRole.Patient,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("12345")
            };

            _db.Users.Add(patient);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Patient created successfully" });
        }

        // get all patients method 
        [HttpGet("get-patients")]
        public async Task<IActionResult> GetPatients()
        {
            var patients = await _db.Users
                .Where(u => u.Role == UserRole.Patient)
                .OrderByDescending(d => d.Id)
                .Select(d => new
                {
                    d.Id,
                    d.FullName,
                    d.Email,
                    d.ProfileImagePath
                })
                .ToListAsync();

            return Ok(patients);
        }

        // try to delete a patient 
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSystemUser(int id)
        {
            var systemUser = await _db.Users.FindAsync(id);
            if (systemUser == null)
                return NotFound();

            _db.Users.Remove(systemUser); // remove signle user
            await _db.SaveChangesAsync();

            return Ok(new { message = "User successfully deleted" });
        }

        //public class UserUpdateDTO
        //{
        //    public string FullName { get; set; } = "";
        //    public string Email { get; set; } = "";
        //    public string Role { get; set; } = "";
        //}
        //[HttpPut("{id}")]
        //public async Task<ActionResult> UpdateSystemUser(int id, [FromBody] UserUpdateDTO dto)
        //{
        //    var user = await _db.Users.FindAsync(id);
        //    if (user == null)
        //        return NotFound();

        //    user.FullName = dto.FullName;
        //    user.Email = dto.Email;

        //    if (Enum.TryParse<UserRole>(dto.Role, true, out var parsedRole))
        //        user.Role = parsedRole;
        //    else
        //        return BadRequest("Invalid role.");

        //    await _db.SaveChangesAsync();

        //    return Ok("User updated successfully.");
        //}


    }
}
