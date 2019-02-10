using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using IonicResearch.Data.Dtos;
using IonicResearch.Data.Repositories.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace IonicResearch.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly IAuthRepository _repo;
		private readonly IConfiguration _config;
		private readonly IMapper _mapper;
		public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
		{
			this._config = config;
			this._repo = repo;
			this._mapper = mapper;
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
		{
			var userFromRepo = await _repo.Login(userForLoginDto.UserName, userForLoginDto.Password);

			if (userFromRepo == null)
				return Unauthorized();

			var claims = new[]
			{
				new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
				new Claim(ClaimTypes.Name, userFromRepo.UserName)
			};

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims),
				Expires = DateTime.Now.AddDays(10),
				SigningCredentials = creds
			};

			var tokenHandler = new JwtSecurityTokenHandler();

			var token = tokenHandler.CreateToken(tokenDescriptor);
            var user = _mapper.Map<UserDto>(userFromRepo);

			return Ok(new
			{
				Token = tokenHandler.WriteToken(token),
                User = user
			});
		}
	}
}