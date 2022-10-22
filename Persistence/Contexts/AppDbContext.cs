using System;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Persistence.Contexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Message> Messages { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Room>().ToTable("Rooms");
            builder.Entity<Room>().Property(p => p.RoomId).IsRequired().ValueGeneratedOnAdd();
            //seed rooms
            builder.Entity<Room>().HasData
            (
                new Room
                {
                    RoomId = "101",
                    Name = "Konferensrum Kråkan",
                    Timestamp = new DateTime()
                },
                new Room
                {
                    RoomId = "102",
                    Name = "Köket",
                    Timestamp = new DateTime()
                },
                new Room
                {
                    RoomId = "103",
                    Name = "Rum 453",
                    Timestamp = new DateTime()
                },
                new Room
                {
                    RoomId = "104",
                    Name = "Hotellobby",
                    Timestamp = new DateTime()
                }
            );

            builder.Entity<Message>().ToTable("Messages");
            builder.Entity<Message>().Property(p => p.MessageId).IsRequired().ValueGeneratedOnAdd();
            //seed messages
            builder.Entity<Message>().HasData
            (
                new Message
                {
                    MessageId = "1",
                    RoomId = "101",
                    MessageText = "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. #arkitektur",
                    Timestamp = new DateTime(2022, 10, 12, 19, 15, 0),
                    Author = "Niklas Björk"
                },
                new Message
                {
                    MessageId = "2",
                    RoomId = "101",
                    MessageText = "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. #arkitektur #designmönster",
                    Timestamp = new DateTime(2022, 10, 13, 12, 01, 0),
                    Author = "Viktor Lyresten"
                },
                new Message
                {
                    MessageId = "3",
                    RoomId = "101",
                    MessageText = "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis. #arkitektur #ramverk",
                    Timestamp = new DateTime(2022, 10, 14, 21, 12, 0),
                    Author = "Johannes Jacobsson"
                },
                new Message
                {
                    MessageId = "4",
                    RoomId = "101",
                    MessageText = "Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. #arkitektur #designmönster #ramverk",
                    Timestamp = new DateTime(2022, 10, 15, 08, 22, 0),
                    Author = "Viktor Lyresten"
                },
                new Message
                {
                    MessageId = "5",
                    RoomId = "101",
                    MessageText = "Nullam id dolor id nibh ultricies vehicula ut id elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. #arkitektur #ramverk",
                    Timestamp = new DateTime(2022, 10, 15, 09, 34, 0),
                    Author = "Johannes Jacobsson"
                },
                new Message
                {
                    MessageId = "6",
                    RoomId = "103",
                    MessageText = "Någon har kastat ut tv:n genom fönstret. #tv #rocknroll",
                    Timestamp = new DateTime(2022, 10, 17, 10, 0, 0),
                    Author = "Ebba Busch"
                },
                new Message
                {
                    MessageId = "7",
                    RoomId = "103",
                    MessageText = "Jag har en tjock-tv som vi kan använda så länge. #tv #tjocktv",
                    Timestamp = new DateTime(2022, 10, 17, 10, 25, 0),
                    Author = "Johan Pehrson"
                },
                new Message
                {
                    MessageId = "8",
                    RoomId = "103",
                    MessageText = "Ok. Jag skickar Jimmie Åkesson till dig så får han bära upp, och sparka igång den. Han behöver träna lite, he he... #tv #tjocktv #lifeishard",
                    Timestamp = new DateTime(2022, 10, 17, 10, 32, 0),
                    Author = "Ebba Busch"
                }
            );
        }
    }
}