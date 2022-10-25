import React, { useState, useEffect, useContext, createContext } from 'react';
import { MessageContextProvider } from './Components/Contexts/message-context';
import { connection } from './Model/Service/signalr-connection';
import useUser from './Components/Contexts/user-context';
import useRoom from './Components/Contexts/room-context';
import Landingpage from './Components/landingpage';
import Home from './Components/home';
import Room from './Components/room';
import { Routes, Route, Outlet } from "react-router-dom";
import PageLayout from './Components/pageLayout';
import AllMessages from './Components/all-messages';

const App = () => {
    const { loggedIn } = useUser();
    const { rooms } = useRoom();
    const newMessageHandler = () => {
        var message = {
            roomId: "101",
            messageText: "Nytt testmeddelande",
            timestamp: "2022-10-13T12:01:00",
            author: "Test Test"
        }
        connection.invoke("NotifyNewMessage", message).catch(function (err) {
            return console.error(err.toString());
        });
    }

    return (
        <MessageContextProvider>
            <>
                {loggedIn ?
                    <>
                        <Routes>
                            <Route path="/" element={<PageLayout />}>
                                <Route path="/home" element={<Home />} />
                                <Route path="/all-messages" element={<AllMessages />} />
                                <Route path="/room/:roomId" element={<Room />} />
                            </Route>
                        </Routes>
                    </>
                    :
                    <Landingpage />
                }
                <button onClick={newMessageHandler}>New Message</button>
            </>
        </MessageContextProvider>
    );
}
export default App