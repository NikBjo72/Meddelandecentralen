using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Interfaces;

namespace Domain.Entities
{
    public class Room : IRoom
    {
        public string RoomId { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public DateTime Timestamp { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}