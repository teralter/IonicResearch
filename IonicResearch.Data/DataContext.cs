using IonicResearch.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace IonicResearch.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<OutletForm> OutletForms { get; set; }
        public DbSet<OutletType> OutletTypes { get; set; }
        public DbSet<OutletPhoto> OutletPhotos { get; set; }
        public DbSet<OutletProduct> OutletProducts { get; set; }
        public DbSet<OutletFormProduct> OutletFormProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(x => x.UserName).IsUnique();

            modelBuilder.Entity<OutletFormProduct>()
                .HasKey(x => new { x.FormId, x.ProductId });

        }
    }
}