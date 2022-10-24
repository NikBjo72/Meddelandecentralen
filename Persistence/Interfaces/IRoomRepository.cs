using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Persistence.Interfaces
{
    public interface IRoomRepository
    {
        public IQueryable<Room> QueryableRoom();
        public Task AddAsync(Room room);
        public void Edit(Room room);
        public void Delete(string roomId);
        public Room GetById(string roomId);

    }
}