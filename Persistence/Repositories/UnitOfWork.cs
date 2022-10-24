using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Persistence.Contexts;
using Persistence.Interfaces;

namespace Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        public UnitOfWork(AppDbContext context)
        {
            _context = context;     
        }

       public async Task<int> CompleteAsync()
        {
            int response = await _context.SaveChangesAsync();
            return response;
        }
    }
}