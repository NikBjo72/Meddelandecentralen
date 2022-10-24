using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Services.Interfaces
{
    public interface IRoomService
    {
        public Task<Room> CreateRoom(Room room);
        public IQueryable<Room> GetAllRooms();
        public Room GetRoomById(string roomId);
        public Task<Room> EditRoom(Room room);
        public Task<int> DeleteRoom(string roomId);

    }
}