import React, { useState, useEffect, useContext, createContext } from 'react';
import { useStorageState } from 'react-storage-hooks';
import { startConnection, stopConnection } from '../../Model/Service/signalr-connection';

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [username, setUsername] = useStorageState(localStorage, 'username', [])
  const [userId, setUserId] = useStorageState(localStorage, 'connectionId', [])
  const [loggedIn, setLoggedIn] = useStorageState(localStorage, 'loggedIn', [])

  useEffect(() => {
    if (loggedIn) {
      (async () => {
        setUserId(await startConnection());
      })()
    }
    if (!loggedIn) {
      stopConnection()
    }
  }, [loggedIn])

  // For development
  // useEffect(() => {
  //   console.log('username:', username);
  //   console.log('userId:', userId);
  //   console.log('loggedIn:', loggedIn);
  // });

  return (
    <UserContext.Provider
      value={{
        username: username,
        setUsername: setUsername,
        userId: userId,
        setUserId: setUserId,
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
