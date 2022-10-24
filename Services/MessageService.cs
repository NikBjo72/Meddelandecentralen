using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Entities;
using Persistence.Interfaces;
using Services.Interfaces;

namespace Services
{
    public class MessageService : IMessageService
    {
        private IRoomRepository _roomRepository;
        private IMessageRepository _messageRepository;
        private IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MessageService
        (
            IRoomRepository roomRepository,
            IMessageRepository messageRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper
        )
        {
            _roomRepository = roomRepository;
            _messageRepository = messageRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Message> CreateMessage(Message message)
        {
            var newMessage = _mapper.Map<Message>(message);
            await _messageRepository.AddAsync(newMessage);
            await _unitOfWork.CompleteAsync();
            return newMessage;
        }

        public IQueryable<Message> GetAllMessages()
        {
            return _messageRepository.QueryableMessage();
        }

        public Message GetMessageById(string messageId)
        {
            return _messageRepository.GetById(messageId);
        }

        public List<Message> GetMessagesByRoomId(string roomId)
        {
            var room = _roomRepository.GetById(roomId);
            if (room == null)
            {
                throw new Exception("There is no room with this Id");
            }
            return room.Messages.ToList();
        }

        public async Task<Message> EditMessage(Message message)
        {
            _messageRepository.Edit(message);
            int response = await _unitOfWork.CompleteAsync();
            return message;
        }

        public async Task<int> DeleteMessage(string messageId)
        {
            var messages = GetAllMessages();
            if (!messages.Any(r => r.MessageId == messageId)) throw new Exception("There is no message with this Id");
            _messageRepository.Delete(messageId);
            int response = await _unitOfWork.CompleteAsync();
            return response;
        }
    }
}