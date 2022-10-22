using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace mycv.API.Persistence.Interfaces
{
    public interface ICvRepository
    {
        public IQueryable<Cv> QueryableCv();
        public Task AddAsync(Cv cv);
        public void Edit(Cv cv);
        public void Delete(string cvId);
        public Cv GetById(string cvId);

    }
}