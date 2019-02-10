using IonicResearch.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace IonicResearch.Data
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options) { }

		public DbSet<User> Users { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<User>()
				.HasIndex(x => x.UserName).IsUnique();
		}
	}
}