using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;

namespace Services.Interfaces
{
    public interface IMessageService
    {
        public Task<Message> CreateMessage(Message message);
        public IQueryable<Message> GetAllMessages();
        public Message GetMessageById(string messageId);
        public List<Message> GetMessagesByRoomId(string roomId);
        public Task<Message> EditMessage(Message message);
        public Task<int> DeleteMessage(string messageId);

    }
}