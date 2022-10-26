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
import SortAndSearch from './sort-and-search';

export const Room = (props) => {
    const { rooms } = useRoom();
    const { messages } = useMessage();
    const { username } = useUser();
    const location = useLocation();
    const [roomId, setRoomId] = useState(location.pathname.split('/')[2]);
    const [thisRoom, setThisRoom] = useState();
    const [thisRoomsMessages, setThisRoomsMessages] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        console.log('Kör use effect!');
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

    const handleSortOnClick = (sort) => {
        if(sort === 'newest') {
            setThisRoomsMessages((thisRoomsMessages) => [...thisRoomsMessages.sort((a,b) => b.timestamp > a.timestamp)]);
            
        } else {
            setThisRoomsMessages((thisRoomsMessages) => [...thisRoomsMessages.sort((a,b) => a.timestamp > b.timestamp)]);            
        }
    }

    useEffect(() => {
        console.log('thisRoomsMessages:', thisRoomsMessages);
    }, [thisRoomsMessages])

    useEffect(() => {
        console.log('searchText:', searchText);
    }, [searchText])

    const searchOnChange = (search) => {
        console.log('search:', search);
        setSearchText(search);
    }

    useEffect(() => {
        console.log('Kör search use effect');
        var seachedMessages = [];
        if (searchText.trim().length !== 0) {
            thisRoomsMessages.forEach((message) => {
                if(message.messageText.split(' ').some(w => w === searchText)) {
                    console.log('Kör filter!!!');
                    seachedMessages.push(thisRoomsMessages.filter(m => m.messageId === message.messageId)[0]);
                    setThisRoomsMessages(seachedMessages);
                }
            })
        } else {
            if(messages) {
                setThisRoomsMessages(messages.filter(m => m.roomId === roomId));
            }
        }
    },[searchText])

    if (thisRoom) {
        return (
            <div className="container-fluid">
                <RoomHeader thisRoom={thisRoom} />
                <SortAndSearch handleSortOnClick={ handleSortOnClick } searchOnChange={ searchOnChange }/>
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