import React, { useState, useEffect, useContext, createContext } from 'react';
import { RoomContextProvider } from './Components/Contexts/room-context';
import { MessageContextProvider } from './Components/Contexts/message-context';
import { connection } from './Model/Service/signalr-connection';

const App = () => {

    const newMessageHandler = () => {
        message = {
            roomId: "101",
            messageText: "Nytt testmeddelande",
            timestamp: "2022-10-13T12:01:00",
            author: "Test Test"
        }
        connection.invoke("NotifyNewMessage", message).catch(function (err) {
            return console.error(err.toString());
        });
    }

    const newRoomHandler = () => {
        room = {
            RoomId: "101",
            Name: "Konferansrum Kråkan",
            Timestamp: "2022-10-13T12:01:00",
        }
        connection.invoke("NotifyNewRoom", room).catch(function (err) {
            return console.error(err.toString());
        });
    }

    return (
        <RoomContextProvider>
            <MessageContextProvider>
                <>
                    <h1>Hello World!</h1>
                    <button onClick={newMessageHandler}>New Message</button>
                    <button onClick={newRoomHandler}>New Room</button>
                </>
            </MessageContextProvider>
        </RoomContextProvider>
    );
}
export default App