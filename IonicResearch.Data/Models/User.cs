using System.ComponentModel.DataAnnotations;

namespace IonicResearch.Data.Models
{
	public class User
	{
		public int Id { get; set; }
        [MaxLength(50)]
		public string UserName { get; set; }
		public byte[] PasswordHash { get; set; }
		public byte[] PasswordSalt { get; set; }
	}
}