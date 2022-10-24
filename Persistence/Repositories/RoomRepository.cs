using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Persistence.Interfaces;
using Persistence.Contexts;

namespace Persistence.Repositories
{
    public class RoomRepository : BaseRepository, IRoomRepository
    {
        public RoomRepository(AppDbContext context) : base(context) { }

        public IQueryable<Room> QueryableRoom()
        {
            IQueryable<Room> rooms = _context.Rooms;
            return rooms;
        }

        public async Task AddAsync(Room room)
        {
            await _context.Rooms.AddAsync(room);
        }

        public void Edit(Room room)
        {
            _context.Rooms.Update(room);
        }

        public void Delete(string roomId)
        {
            Room room = GetById(roomId);
            _context.Rooms.Remove(room);
        }

        public Room GetById(string roomId)
        {
            var room = _context.Rooms
                .Include(m => m.Messages)
                .FirstOrDefault(c => c.RoomId == roomId);
            if (room == null) throw new KeyNotFoundException("Room not found");
            return room;
        }
    }
}