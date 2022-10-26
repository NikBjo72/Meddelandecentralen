import React, { useState, useEffect, useContext, createContext } from 'react';
import { useStorageState } from 'react-storage-hooks';
import { connection, startConnection } from '../../Model/Service/signalr-connection';

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [username, setUsername] = useStorageState(localStorage, 'username', [])
  const [connectionId, setConnectionId] = useStorageState(localStorage, 'connectionId', [])
  const [loggedIn, setLoggedIn] = useStorageState(localStorage, 'loggedIn', [])

  useEffect(() => {
    if (loggedIn) {
      startConnection().catch((err) => {
        return console.error(err.toString());
      });
    }
  },[loggedIn])

  useEffect(() => {
    console.log('username:', username);
    console.log('connectionId:', connectionId);
    console.log('loggedIn:', loggedIn);
  }, [username]);

  return (
    <UserContext.Provider
      value={{
        username: username,
        setUsername: setUsername,
        connectionId: connectionId,
        setConnectionId: setConnectionId,
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
// Export hook for the context.
export default useUser = () => useContext(UserContext);
