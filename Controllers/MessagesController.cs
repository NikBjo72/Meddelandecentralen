using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Services.Interfaces;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class MessagesController : ControllerBase
    {
        private readonly IRoomService _roomService;
        private readonly IMessageService _messageService;
        private IWebHostEnvironment _hostingEnvironment;

        public MessagesController(
            IRoomService roomService,
            IMessageService messageService,
            IWebHostEnvironment environment
        )
        {
            _roomService = roomService;
            _messageService = messageService;
            _hostingEnvironment = environment;
        }

        [HttpPost]
        public async Task<ActionResult<Message>> AddMessage(Message model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var response = await _messageService.CreateMessage(model);
                    return response;
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return BadRequest();
        }

        [HttpGet]
        public ActionResult<IList<Message>> GetAllMessages()
        {
            try
            {
                var messages = _messageService.GetAllMessages();
                return Ok(messages);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{messageId}")]
        public ActionResult<Message> GetMessageById(string messageId)
        {
            try
            {
                var message = _messageService.GetMessageById(messageId);
                return Ok(message);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("room/{roomId}")]
        public ActionResult<Message> GetMessagesByRoomId(string roomId)
        {
            try
            {
                var messages = _messageService.GetMessagesByRoomId(roomId);

                return Ok(messages);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPatch("{messageId}")]
        public async Task<ActionResult<Message>> EditMessage(Message message, string messageId)
        {
            try
            {
                var messageToEdit = _messageService.GetMessageById(messageId);
                messageToEdit.MessageText = message.MessageText;
                var newMessage = await _messageService.EditMessage(messageToEdit);
                return Ok(newMessage);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{messageId}")]
        public async Task<ActionResult<int>> DeleteMessage(string messageId)
        {
            try
            {
                int response = await _messageService.DeleteMessage(messageId);
                if (response > 0)
                {
                    return Ok(new { message = "Message deleted successfully" });
                }
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
            return BadRequest();
        }
    }
}
