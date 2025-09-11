namespace WebApi.DTOs
{
    public class DoctorCreateRequest
    {
        public string FullName { get; set; } = "";
        public string Email { get; set; } = "";
        //public string Specialty { get; set; } = "";
        public IFormFile? ProfileImage { get; set; } 
    }
}
