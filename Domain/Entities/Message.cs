using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Interfaces;

namespace Domain.Entities
{
    public class Message : IMessage
    {
        public string MessageId { get; set; }
        [ForeignKey("Room")]
        [Required]
        public string RoomId { get; set; }
        public string MessageText { get; set; }
        public DateTime Timestamp { get; set; }
        public string Author { get; set; }
    }
}