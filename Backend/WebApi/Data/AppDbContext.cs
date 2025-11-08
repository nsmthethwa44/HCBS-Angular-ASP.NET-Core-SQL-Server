using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<AppointmentModel> Appointments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>().ToTable("Users");
            modelBuilder.Entity<AppointmentModel>().ToTable("Appointments");

            // Optional: add constraints, indexes here
        }
    }
}
