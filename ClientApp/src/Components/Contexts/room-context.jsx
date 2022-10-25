import React, { useState, useEffect, useContext, createContext } from 'react';
import { connection, startConnection } from '../../Model/Service/signalr-connection';
import { GetRooms } from '../../Model/Service/api-request';

const RoomContext = createContext();

export const RoomContextProvider = (props) => {
  const [rooms, setRooms] = useState();

  useEffect(() => {

    (async () => {
      setRooms(await GetRooms());
    })();

    connection.on("RecieveRoom", (room) => {
      setRooms((rooms) => [...rooms, room]);
    });
    if (connection.state != "Connected") {
      startConnection().catch((err) => {
        return console.error(err.toString());
      });
    }
  }, []);

  useEffect(() => {
    if(rooms) {
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