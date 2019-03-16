using System.IO;
using System.Threading.Tasks;
using IonicResearch.Data.Repositories.Outlet;
using Microsoft.AspNetCore.Mvc;

namespace IonicResearch.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DirectoriesController : ControllerBase
    {
        private readonly IOutletRepository _outletRepo;

        public DirectoriesController(IOutletRepository outletRepo)
        {
            this._outletRepo = outletRepo;
        }

        [HttpGet("{dictName}/{regionId}")]
        public async Task<IActionResult> DownloadFias(string dictName, int regionId)
        {
            var memory = new MemoryStream();
            using (var stream = new FileStream($@"F:\{dictName}{regionId}.zip", FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, "application/zip", $@"{dictName}{regionId}.zip");
        }


        [HttpGet("outletTypes")]
        public async Task<IActionResult> GetOutletTypes()
        {
            var result = await _outletRepo.GetOutletTypes();
            return Ok(result);
        }
    }
}