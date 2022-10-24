using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Persistence.Interfaces
{
    public interface IMessageRepository
    {
        public IQueryable<Message> QueryableMessage();
        public Task AddAsync(Message message);
        public void Edit(Message message);
        public void Delete(string messageId);
        public Message GetById(string messageId);

    }
}