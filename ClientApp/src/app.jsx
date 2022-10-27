import React, { useState, useEffect, useContext, createContext } from 'react';
import { MessageContextProvider } from './Components/Contexts/message-context';
import { connection } from './Model/Service/signalr-connection';
import useUser from './Components/Contexts/user-context';
import useRoom from './Components/Contexts/room-context';
import Landingpage from './Components/landingpage';
import Home from './Components/home';
import Room from './Components/room';
import { Routes, Route, Navigate } from "react-router-dom";
import PageLayout from './Components/pageLayout';
import AllMessages from './Components/all-messages';
import { RoomContextProvider } from './Components/Contexts/room-context';

const App = () => {
    const { loggedIn } = useUser();

    return (

        <>
            {loggedIn ?
                <>
                    <RoomContextProvider>
                        <MessageContextProvider>
                            <Routes>
                                <Route path="/" element={<PageLayout />}>
                                    <Route path="/" element={<Navigate to="/home" replace />} />
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/all-messages" element={<AllMessages />} />
                                    <Route path="/room/:roomId" element={<Room />} />
                                </Route>
                            </Routes>
                        </MessageContextProvider>
                    </RoomContextProvider>
                </>
                :
                <Landingpage />
            }
        </>

    );
}
export default App