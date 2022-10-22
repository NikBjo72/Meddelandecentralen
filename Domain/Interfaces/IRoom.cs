using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IRoom
    {
        public string RoomId { get; set; }
        public string Name { get; set; }
        public DateTime Timestamp { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}