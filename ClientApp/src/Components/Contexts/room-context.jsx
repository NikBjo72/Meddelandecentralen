import React, { useState, useEffect, useContext, createContext } from 'react';
import { connection } from '../../Model/Service/signalr-connection';
import { GetRooms } from '../../Model/Service/api-request';

const RoomContext = createContext();

export const RoomContextProvider = (props) => {
  const [rooms, setRooms] = useState();
  const [newRoom, setNewRoom] = useState();
  const [deleteRoomId, setDeleteRoomId] = useState();

  useEffect(() => {
    (async () => {
      setRooms(await GetRooms());
    })();

    connection.on("RecieveRoom", (room) => {
      setNewRoom(room);
    });

    connection.on("DeleteRoom", (roomId) => {
      setDeleteRoomId(roomId);
    });
  }, []);

  useEffect(() => {
    if(deleteRoomId) {
      const indexOfRoom = rooms.findIndex(room => {
        return room.roomId === deleteRoomId;
      });
      var newRooms = [...rooms];
      newRooms.splice(indexOfRoom, 1);
      console.log('newRooms:', newRooms);
      setRooms(newRooms);
      setDeleteRoomId();
    }

  }, [deleteRoomId])

  useEffect(() => {
      // Checks if room already exist and replace it if roomId aready is in rooms
      if (rooms) {
        if (rooms.some((obj) => obj.roomId === newRoom.roomId)) {
          const newRooms = rooms.map((obj) => {
            if (obj.roomId === newRoom.roomId) {
              return newRoom;
            }
            return obj;
          });
          setRooms(newRooms); // Replace old room with new
        } else {
          setRooms((rooms) => [...rooms, newRoom]);
        }
      }
  }, [newRoom]);

  useEffect(() => {
    if (rooms) {
      console.log('All rooms from context:', rooms);
    }
  }, [rooms]);

  return (
    <RoomContext.Provider
      value={{
        rooms: rooms
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
};
// Export hook for the context.
export default useRoom = () => useContext(RoomContext);