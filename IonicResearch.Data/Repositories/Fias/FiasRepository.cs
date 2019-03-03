using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using IonicResearch.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace IonicResearch.Data.Repositories.Fias
{
    public class FiasRepository : IFiasRepository
    {
        private readonly DataContext _context;

        public FiasRepository(DataContext context)
        {
            this._context = context;
        }

        public async Task<List<FiasAddressObject>> GetAddressObjects(int rootId)
        {
            return await _context.FiasAddressObjects.FromSql("exec dbo.FiasGetAddressObjects @rootId", new SqlParameter("@rootId", rootId)).ToListAsync();
        }

        public async Task<List<FiasHouse>> GetHouses(int rootId)
        {
            return await _context.FiasHouses.FromSql("exec dbo.FiasGetHouses @rootId", new SqlParameter("@rootId", rootId)).ToListAsync();
        }
    }
}