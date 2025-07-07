// File: Data/ScanDbContext.cs
using Microsoft.EntityFrameworkCore;
using ScreenshotAPI.Models; // If your ScanResult model is in Models

namespace ScreenshotAPI.Data
{
    public class ScanDbContext : DbContext
    {
        public ScanDbContext(DbContextOptions<ScanDbContext> options)
            : base(options)
        {
        }

        public DbSet<ScanResult> ScanResults { get; set; }
    }
}
