using System.Threading.Tasks;
using IonicResearch.Data.Models;

namespace IonicResearch.Data.Repositories.Auth
{
    public interface IAuthRepository
    {
         Task<User> Login(string userName, string password);
    }
}