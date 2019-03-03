using System.Collections.Generic;
using System.Threading.Tasks;
using IonicResearch.Data.Models;

namespace IonicResearch.Data.Repositories.Fias
{
    public interface IFiasRepository
    {
         Task<List<FiasAddressObject>> GetAddressObjects(int rootId);
         Task<List<FiasHouse>> GetHouses(int rootId);
    }
}