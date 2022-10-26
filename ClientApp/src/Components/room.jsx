import React, { useState, useEffect, useRef, } from 'react';
import './room.css';
import { nanoid } from 'nanoid';
import useRoom from './Contexts/room-context';
import useMessage from './Contexts/message-context';
import useUser from './Contexts/user-context';
import { useLocation } from 'react-router-dom';
import RoomHeader from './room-header';
import Footer from './footer';
import Message from './message';
import { connection } from '../Model/Service/signalr-connection';

export const Room = (props) => {
    const { rooms } = useRoom();
    const { messages } = useMessage();
    const { username } = useUser();
    const location = useLocation();
    const [roomId, setRoomId] = useState(location.pathname.split('/')[2]);
    const [thisRoom, setThisRoom] = useState();
    const [thisRoomsMessages, setThisRoomsMessages] = useState([]);

    useEffect(() => {
        if(rooms) {
            setThisRoom(rooms.find(r => r.roomId === roomId));
        }
        if(messages) {
            setThisRoomsMessages(messages.filter(m => m.roomId === roomId));
        }
    },[rooms, messages])

    const determineRowSide = (index) => {
        if(index % 2==0){
            return 'left';
         }
         else {
            return 'right'
         } 
    }

    const determineBoubbleTagSide = (index) => {
        if(index % 2==0){
            return 'sb-left';
         }
         else {
            return 'sb-right'
         } 
    }

    const handleNewMessage = (text) => {
        var newMessage = {
            messageId: nanoid(),
            roomId: roomId,
            messageText: text,
            timestamp: new Date(),
            author: username
        }
        connection.invoke("NotifyNewMessage", newMessage).catch(function (err) {
            return console.error(err.toString());
        });
    }

    if (thisRoom) {
        return (
            <div className="container-fluid">
                <RoomHeader thisRoom={thisRoom} />
                {thisRoomsMessages.map((message, index) => {
                    return (
                        <Message key={message.messageId} author={ message.author } side={ determineRowSide(index) } boubbleTag={ determineBoubbleTagSide(index) } timeStamp={ message.timestamp } text={ message.messageText }/>
                    )
                })}
                <Footer imputField={true} defaultInputText='Nytt meddelande...' onClick={ handleNewMessage }/>
            </div>
        );
    }
}
export default Room