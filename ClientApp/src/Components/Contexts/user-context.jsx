import React, { useState, useEffect, useContext, createContext } from 'react';

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [username, setUsername] = useState();
  const [connectionId, setConnectionId] = useState();
  const [loggedIn, setLoggedIn] = useState(true);

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
