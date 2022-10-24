using System.Threading.Tasks;
using Domain.Entities;
using Hubs.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace Hubs
{
    public class ActionHub : Hub, IActionHub
    {
        public async Task NotifyNewMessage(Message message)
        {
            await Clients.All.SendAsync("RecieveMessage", message);
        }

        public async Task NotifyNewRoom(Room room)
        {
            await Clients.All.SendAsync("RecieveRoom", room);
        }
    }
}