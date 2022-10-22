using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
Domain.Entities;
Persistence.Interfaces;
Persistence.Contexts;

namespace mycv.API.Persistence.Repositories
{
    public class CvRepository : BaseRepository, ICvRepository
    {
        public CvRepository(AppDbContext context) : base(context) {}

        public IQueryable<Cv> QueryableCv()
        {
             IQueryable<Cv> cvs = _context.Cvs;
             return cvs;
        }

        public async Task AddAsync(Cv cv)
	    {
	    	await _context.Cvs.AddAsync(cv);
	    }

        public void Edit(Cv cv)
        {
            _context.Cvs.Update(cv);
        }

        public void Delete(string cvId)
	    {
            Cv cv = GetById(cvId);
	    	_context.Cvs.Remove(cv);
	    }

        public Cv GetById(string cvId)
        {
            var cv = _context.Cvs.Include(c => c.CivilStatus).FirstOrDefault(c => c.CvId == cvId);
            if (cv == null) throw new KeyNotFoundException("Cv not found");
            return cv;
        }
    }
}