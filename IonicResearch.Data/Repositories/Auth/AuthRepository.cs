using System;
using System.Text;
using System.Threading.Tasks;
using IonicResearch.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace IonicResearch.Data.Repositories.Auth
{
	public class AuthRepository : IAuthRepository
	{
		private readonly DataContext _context;
		public AuthRepository(DataContext context)
		{
			this._context = context;

		}
		public async Task<User> Login(string userName, string password)
		{
			var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);

			if (user == null)
				return null;

			if (!VerifyPassworHash(password, user.PasswordHash, user.PasswordSalt))
				return null;

			return user;
		}

		private bool VerifyPassworHash(string password, byte[] passwordHash, byte[] passwordSalt)
		{
			using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
			{
				var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
				for (int i = 0; i < computedHash.Length; i++)
				{
					if (computedHash[i] != passwordHash[i])
						return false;
				}
			}
			return true;
		}

		private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
		{
			using (var hmac = new System.Security.Cryptography.HMACSHA512())
			{
				passwordSalt = hmac.Key;
				passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
			}
		}
	}
}