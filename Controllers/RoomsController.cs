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

    public class RoomsController : ControllerBase
    {
        private readonly IRoomService _roomService;
        private readonly IMessageService _messageService;
        private IWebHostEnvironment _hostingEnvironment;

        public RoomsController(
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
        public async Task<ActionResult<Room>> AddRoom(Room model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var response = await _roomService.CreateRoom(model);
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
        public ActionResult<IList<Room>> GetAllRooms()
        {
            try
            {
                var rooms = _roomService.GetAllRooms();
                return Ok(rooms);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{roomId}")]
        public ActionResult<Room> GetRoomById(string roomId)
        {
            try
            {
                var room = _roomService.GetRoomById(roomId);
                return Ok(room);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPatch("{roomId}")]
        public async Task<ActionResult<Room>> EditRoom(Room room, string roomId)
        {
            try
            {
                var roomToEdit = _roomService.GetRoomById(roomId);
                roomToEdit.Name = room.Name;
                var newRoom = await _roomService.EditRoom(roomToEdit);
                return Ok(newRoom);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{roomId}")]
        public async Task<ActionResult<int>> DeleteRoom(string roomId)
        {
            try
            {
                int response = await _roomService.DeleteRoom(roomId);
                if (response > 0)
                {
                    return Ok(new { message = "Room deleted successfully" });
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
