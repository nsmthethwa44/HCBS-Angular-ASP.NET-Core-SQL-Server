namespace WebApi.Models
{

    // create a user model to, or details needed to this entity 
    // initialise each variable after declaration
    public enum UserRole { Patient, Doctor, Admin }
    public class UserModel
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public UserRole Role { get; set; } // enum, no init needed
        public string? ProfileImagePath { get; set; }
    }
}
