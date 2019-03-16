using System.Collections.Generic;
using System.Threading.Tasks;
using IonicResearch.Data.Models;

namespace IonicResearch.Data.Repositories.Outlet
{
    public interface IOutletRepository
    {
        Task<List<OutletType>> GetOutletTypes();
    }
}