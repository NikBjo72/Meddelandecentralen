using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Interfaces
{
    public interface IUnitOfWork
    {
       public Task<int> CompleteAsync();
    }
}