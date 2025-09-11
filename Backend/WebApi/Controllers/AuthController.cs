using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using WebApi.DTOs;
using WebApi.Models;
using WebApi.Services;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly TokenServices _tokenService;

        public AuthController(AppDbContext db, TokenServices tokenService)
        {
            _db = db;
            _tokenService = tokenService;
        }

        // register new user. if user entered email that already exist return an error msg
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest register)
        {
            if (_db.Users.Any(u => u.Email == register.Email))
                return BadRequest(new  {message = "Email already exists"}); // this error msg

            var user = new UserModel
            {
                FullName = register.FullName,
                Email = register.Email,
                Role = register.Role,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(register.Password)
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Registration successful" }); // or else return successfully registered
        }

        //allow user to login, if entered incorrect details return an error msg
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Email == request.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                return Unauthorized("Invalid credentials"); // this error msg

            var token = _tokenService.GenerateToken(user);
            return Ok(new AuthResponse
            {
                Token = token,
                FullName = user.FullName,
                Role = user.Role
            });
        }
    }

}
