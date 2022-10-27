using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Domain.Interfaces
{
    public interface IMessage
    {
        public string MessageId { get; set; }
        public string RoomId { get; set; }
        public string MessageText { get; set; }
        public string Timestamp { get; set; }
        public string Author { get; set; }
    }
}