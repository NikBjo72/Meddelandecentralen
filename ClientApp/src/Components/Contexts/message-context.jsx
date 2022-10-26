import React, { useState, useEffect, useContext, createContext } from 'react';
import { GetMessages } from '../../Model/Service/api-request';
import { connection } from '../../Model/Service/signalr-connection';

const MessageContext = createContext();

export const MessageContextProvider = (props) => {
  const [messages, setMessages] = useState()

  useEffect(() => {

    (async () => {
      setMessages(await GetMessages());
    })();

    connection.on("RecieveMessage", (message) => {
      setMessages((messages) => [...messages, message]);
    });

  },[]);

  useEffect(() => {
    console.log('All messages from context:', messages);
  }, [messages]);

  return (
    <MessageContext.Provider
      value={{
        messages: messages
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};
// Export hook for the context.
export default useMessage = () => useContext(MessageContext);
