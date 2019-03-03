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
        private const int RowLimit = 100000;
        private readonly IFiasRepository _repo;
        private readonly IMapper _mapper;

        public FiasController(IFiasRepository repo, IMapper mapper)
        {
            this._repo = repo;
            this._mapper = mapper;
        }

        [HttpGet("address-objects/{rootId}")]
        public async Task<IActionResult> GetAddressObjects(int rootId)
        {
            var addressObjects = await _repo.GetAddressObjects(rootId);
            var result = _mapper.Map<IEnumerable<FiasAddressObjectDto>>(addressObjects);
            var json = JsonConvert.SerializeObject(
                new { Data = new { Inserts = new { FiasAddressObjects = result } } },
                new JsonSerializerSettings
                {
                    ContractResolver = new DefaultContractResolver
                    {
                        NamingStrategy = new CamelCaseNamingStrategy()
                    }
                });

            System.IO.File.WriteAllText($@"F:\addressObjects.json", json);

            return Ok();
        }

        [HttpGet("houses/{rootId}")]
        public async Task<IActionResult> GetHouses(int rootId)
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

                System.IO.File.WriteAllText($@"F:\houses50_p{i}.json", json);
            }



            return Ok();
        }
    }
}