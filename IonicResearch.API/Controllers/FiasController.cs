using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IonicResearch.Data.Dtos;
using IonicResearch.Data.Repositories.Fias;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace IonicResearch.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FiasController : ControllerBase
    {
        private const int RowLimit = 40000;
        private readonly IFiasRepository _repo;
        private readonly IMapper _mapper;

        public FiasController(IFiasRepository repo, IMapper mapper)
        {
            this._repo = repo;
            this._mapper = mapper;
        }

        [HttpGet("address-objects")]
        public async Task<IActionResult> GetAddressObjects(int rootId, int regionId)
        {
            var addressObjects = await _repo.GetAddressObjects(rootId);
            var result = _mapper.Map<List<FiasAddressObjectDto>>(addressObjects);
            for (int i = 0; i <= result.Count / RowLimit; i++)
            {
                var json = JsonConvert.SerializeObject(
                    new { Data = new { Inserts = new { FiasAddressObjects = result.Skip(i * RowLimit).Take(RowLimit) } } },
                    new JsonSerializerSettings
                    {
                        ContractResolver = new DefaultContractResolver
                        {
                            NamingStrategy = new CamelCaseNamingStrategy()
                        }
                    });
                System.IO.File.WriteAllText($@"F:\addressObjects{regionId}_p{i}.json", json);
            }


            return Ok();
        }

        [HttpGet("houses")]
        public async Task<IActionResult> GetHouses(int rootId, int regionId)
        {
            var houses = await _repo.GetHouses(rootId);
            var result = _mapper.Map<List<FiasHouseDto>>(houses);

            for (int i = 0; i <= result.Count / RowLimit; i++)
            {
                var json = JsonConvert.SerializeObject(
                   new { Data = new { Inserts = new { FiasHouses = result.Skip(i * RowLimit).Take(RowLimit) } } },
                   new JsonSerializerSettings
                   {
                       ContractResolver = new DefaultContractResolver
                       {
                           NamingStrategy = new CamelCaseNamingStrategy()
                       }
                   });

                System.IO.File.WriteAllText($@"F:\houses{regionId}_p{i}.json", json);
            }



            return Ok();
        }
    }
}