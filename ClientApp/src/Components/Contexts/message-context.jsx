import React, { useState, useEffect, useContext, createContext } from 'react';
import { GetMessages } from '../../Model/Service/api-request';
import { connection } from '../../Model/Service/signalr-connection';

const MessageContext = createContext({});

export const MessageContextProvider = (props) => {
  const [messages, setMessages] = useState()
  const [newMessagesId, setNewMessagesId] = useState([])
  const [update, setUpdate] = useState(true);

  const updateMessageContext = () => {
    if(update) {
      setUpdate(false)
    } else setUpdate(true)
  }

  useEffect(() => {

    (async () => {
      setMessages(await GetMessages());
    })();

    connection.on("NotifyNewMessage", (message) => {
      setNewMessagesId((newMessagesId) => [...newMessagesId, message.messageId]);
    });

    connection.on("RecieveMessage", (message) => {
      setMessages((messages) => [...messages, message]);
    });

  },[]);

  // For development
  // useEffect(() => {
  //   console.log('All messages from context:', messages);
  //   console.log('New messages Id:', newMessagesId);
  // }, [messages, newMessagesId]);

  return (
    <MessageContext.Provider
      value={{
        messages: messages,
        setMessages: setMessages,
        newMessagesId: newMessagesId,
        setNewMessagesId: setNewMessagesId,
        updateMessageContext: updateMessageContext
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};
// Export hook for the context.
export default () => useContext(MessageContext);
