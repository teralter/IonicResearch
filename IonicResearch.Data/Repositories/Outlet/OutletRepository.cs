using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IonicResearch.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace IonicResearch.Data.Repositories.Outlet
{
    public class OutletRepository : IOutletRepository
    {
        private readonly DataContext _context;

        public OutletRepository(DataContext context)
        {
            this._context = context;
        }
        public async Task<List<OutletType>> GetOutletTypes()
        {
            return await _context.OutletTypes.ToListAsync();
        }
    }
}