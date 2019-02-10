using AutoMapper;
using IonicResearch.Data.Dtos;
using IonicResearch.Data.Models;

namespace IonicResearch.Data.Profiles
{
	public class UserProfile : Profile
	{
		public UserProfile()
		{
			CreateMap<User, UserDto>();
		}
	}
}