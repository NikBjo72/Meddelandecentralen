using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Entities;
using Hubs.Interfaces;
using Persistence.Interfaces;
using Services.Interfaces;

namespace Services
{
    public class RoomService : IRoomService
    {
        private IRoomRepository _roomRepository;
        private IMessageRepository _messageRepository;
        private IActionHub _actionHub;
        private IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public RoomService
        (
            IRoomRepository roomRepository,
            IMessageRepository messageRepository,
            IActionHub actionHub,
            IUnitOfWork unitOfWork,
            IMapper mapper
        )
        {
            _roomRepository = roomRepository;
            _messageRepository = messageRepository;
            _actionHub = actionHub;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Room> CreateRoom(Room room)
        {
            await _roomRepository.AddAsync(room);
            await _unitOfWork.CompleteAsync();
            await _actionHub.NotifyNewRoom(room);
            return room;
        }

        public IQueryable<Room> GetAllRooms()
        {
            return _roomRepository.QueryableRoom();
        }

        public Room GetRoomById(string roomId)
        {
            return _roomRepository.GetById(roomId);
        }

        public async Task<Room> EditRoom(Room room)
        {
            _roomRepository.Edit(room);
            int response = await _unitOfWork.CompleteAsync();
            await _actionHub.NotifyNewRoom(room);
            return room;
        }

        public async Task<int> DeleteRoom(string roomId)
        {
            var rooms = GetAllRooms();
            if (!rooms.Any(r => r.RoomId == roomId)) throw new Exception("There is no room with this Id");
            _roomRepository.Delete(roomId);
            int response = await _unitOfWork.CompleteAsync();
            return response;
        }
    }
}