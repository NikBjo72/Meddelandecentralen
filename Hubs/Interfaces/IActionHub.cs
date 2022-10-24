using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.AspNetCore.SignalR;

namespace Hubs.Interfaces
{
    public interface IActionHub
    {
        public Task NotifyNewMessage(Message message);
        public Task NotifyNewRoom(Room room);
    }
}