using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace IonicResearch.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DirectoriesController : ControllerBase
    {

        public DirectoriesController()
        {
        }

        [HttpGet("address-objects/{regionId}")]
        public async Task<IActionResult> DownloadAddressObjects(int regionId)
        {
            var memory = new MemoryStream();
            using (var stream = new FileStream($@"F:\addressObjects{regionId}.json", FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, "application/json", $@"addressObjects{regionId}.json");
        }


        [HttpGet("houses/{regionId}")]
        public async Task<IActionResult> DownloadHouses(int regionId)
        {
            var memory = new MemoryStream();
            using (var stream = new FileStream($@"F:\houses{regionId}.zip", FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, "application/zip", $@"houses{regionId}.zip");
        }
    }
}