using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.AspNetCore.SignalR;
using Services.Interfaces;

namespace Hubs
{
    public class ActionHub : Hub
    {
        private readonly IRoomService _roomService;
        private readonly IMessageService _messageService;

        public ActionHub(
            IRoomService roomService,
            IMessageService messageService
        )
        {
            _roomService = roomService;
            _messageService = messageService;
        }

        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }

        public async Task NotifyNewMessage(Message message)
        {
            await Clients.All.SendAsync("RecieveMessage", message);
            if (_messageService.GetAllMessages().Any(m => m.MessageId == message.MessageId))
            {
                await _messageService.EditMessage(message);
            }
            else
            {
                await _messageService.CreateMessage(message);
            }
        }

        public async Task NotifyNewRoom(Room room)
        {
            await Clients.All.SendAsync("RecieveRoom", room);

            if (_roomService.GetAllRooms().Any(m => m.RoomId == room.RoomId))
            {
                await _roomService.EditRoom(room);
            }
            else
            {
                await _roomService.CreateRoom(room);
            }
        }

        public async Task NotifyDeleteRoom(string roomId)
        {
            await _roomService.DeleteRoom(roomId);
            await Clients.All.SendAsync("DeleteRoom", roomId);
        }
    }
}