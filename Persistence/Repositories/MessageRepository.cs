using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Persistence.Interfaces;
using Persistence.Contexts;

namespace Persistence.Repositories
{
    public class MessageRepository : BaseRepository, IMessageRepository
    {
        public MessageRepository(AppDbContext context) : base(context) {}

        public IQueryable<Message> QueryableMessage()
        {
             IQueryable<Message> messages = _context.Messages;
             return messages;
        }

        public async Task AddAsync(Message message)
	    {
	    	await _context.Messages.AddAsync(message);
	    }

        public void Edit(Message message)
        {
            _context.Messages.Update(message);
        }

        public void Delete(string messageId)
	    {
            Message message = GetById(messageId);
	    	_context.Messages.Remove(message);
	    }

        public Message GetById(string messageId)
        {
            var message = _context.Messages.FirstOrDefault(c => c.MessageId == messageId);
            if (message == null) throw new KeyNotFoundException("Message not found");
            return message;
        }
    }
}