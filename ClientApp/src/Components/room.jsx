import React, { useState, useEffect, useRef, } from 'react';
import './room.css';
import imageUrl from '../Model/Service/images';
import useRoom from './Contexts/room-context';
import useMessage from './Contexts/message-context';
import { useLocation } from 'react-router-dom';
import RoomHeader from './room-header';
import Footer from './footer';
import Message from './message';

export const Room = (props) => {
    const { rooms } = useRoom();
    const { messages } = useMessage();
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

    if (thisRoom && thisRoomsMessages.length > 0) {
        return (
            <div className="container-fluid">
                <RoomHeader thisRoom={thisRoom} />
                {thisRoomsMessages.map((message, index) => {
                    return (
                        <Message author={ message.author } side={ determineRowSide(index) } boubbleTag={ determineBoubbleTagSide(index) } timeStamp={ message.timestamp } text={ message.messageText }/>
                    )
                })}
                <Footer imputField={true} defaultInputText='Nytt meddelande...' />
            </div>
        );
    }
}
export default Room