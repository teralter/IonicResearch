using AutoMapper;
using IonicResearch.Data.Dtos;
using IonicResearch.Data.Models;

namespace IonicResearch.Data.Profiles
{
    public class FiasProfile : Profile
    {
        public FiasProfile()
        {
            // CreateMap<FiasAddressObject, FiasAddressObjectDto>()
            //     .ForMember(dest => dest.PId, opt =>
            //     {
            //         opt.MapFrom(src => src.ParentId);
            //     })
            //     .ForMember(dest => dest.F, opt =>
            //     {
            //         opt.MapFrom(src => src.FormalName);
            //     })
            //     .ForMember(dest => dest.S, opt =>
            //     {
            //         opt.MapFrom(src => src.ShortName);
            //     })
            //     .ForMember(dest => dest.L, opt =>
            //     {
            //         opt.MapFrom(src => src.Level);
            //     })
            // ;

            CreateMap<FiasHouse, FiasHouseDto>()
                .ForMember(dest => dest.AoId, opt =>
                {
                    opt.MapFrom(src => src.AddressObjectId);
                })
                .ForMember(dest => dest.H, opt =>
                {
                    opt.MapFrom(src => src.HouseNum);
                })
                .ForMember(dest => dest.B, opt =>
                {
                    opt.MapFrom(src => src.BuildNum);
                })
                .ForMember(dest => dest.S, opt =>
                {
                    opt.MapFrom(src => src.StructNum);
                })
            ;
        }
    }
}