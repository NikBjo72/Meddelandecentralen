import React, { useState, useEffect, useContext, createContext } from 'react';
import { connection, startConnection } from '../../Model/Service/signalr-connection';

const RoomContext = createContext();

export const RoomContextProvider = (props) => {
  const [latestRoom, setLatestRoom] = useState()

  useEffect(() => {
    connection.on("RecieveRoom", (room) => {
      setLatestRoom(room);
    });
    if(connection.state != "Connected") {
      startConnection().catch((err) => {
        return console.error(err.toString());
      });
    }
  },[]);

  useEffect(() => {
    console.log('latestRoom:', latestRoom);
  }, [latestRoom]);

  return (
    <RoomContext.Provider
      value={{
        latestRoom: latestRoom
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
};
// Export hook for the context.
export default useRoom = () => useContext(RoomContext);