import React, { useState, useEffect, useContext, createContext } from 'react';
import { connection, startConnection } from '../../Model/Service/signalr-connection';

const MessageContext = createContext();

export const MessageContextProvider = (props) => {
  const [latestMessage, setLatestMessage] = useState()

  useEffect(() => {
    connection.on("RecieveMessage", (message) => {
      setLatestMessage(message);
    });
    if(connection.state != "Connected") {
      startConnection().catch((err) => {
        return console.error(err.toString());
      });
    }
  },[]);

  useEffect(() => {
    console.log('latestMessage:', latestMessage);
  }, [latestMessage]);

  return (
    <MessageContext.Provider
      value={{
        latestMessage: latestMessage
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};
// Export hook for the context.
export default useMessage = () => useContext(MessageContext);
