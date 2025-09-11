using WebApi.Models;

namespace WebApi.DTOs
{
    public class AuthResponse
    {
        public string Token { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public UserRole Role { get; set; } 
    }
}
