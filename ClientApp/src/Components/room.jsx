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
    const { messages, newMessagesId, setNewMessagesId, updateMessageContext } = useMessage();
    const { username } = useUser();
    const location = useLocation();
    const [roomId, setRoomId] = useState(location.pathname.split('/')[2]);
    const [thisRoom, setThisRoom] = useState();
    const [thisRoomsMessages, setThisRoomsMessages] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        return () => {
            if (messages) {
                var referense = messages.filter(m => m.roomId === roomId)
                referense.forEach((message) => {
                    const idx = newMessagesId.findIndex(id => {
                        return id === message.messageId;
                    });
                    if(idx > -1) {
                        newMessagesId.splice(idx, 1);
                    }
                })
                setNewMessagesId(newMessagesId);
                updateMessageContext();
            }
        }
    }, [])

    useEffect(() => {
        if (rooms) {
            setThisRoom(rooms.find(r => r.roomId === roomId));
        }
        if (messages) {
            setThisRoomsMessages(messages.filter(m => m.roomId === roomId));
        }
    }, [rooms, messages])

    const determineRowSide = (index) => {
        if (index % 2 == 0) {
            return 'left';
        }
        else {
            return 'right'
        }
    }

    const determineBoubbleTagSide = (index) => {
        if (index % 2 == 0) {
            return 'sb-left';
        }
        else {
            return 'sb-right'
        }
    }

    const determineNewMessage = (messageId) => {
        if (newMessagesId.some(id => id === messageId)) {
            return 'newMessage';
        } else {
            return '';
        }
    }

    const getLocalDateAndTime = () => {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000;
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
        var TimeArray = localISOTime.split('T');
        var Time = TimeArray[1].split('.');
        return `${TimeArray[0]} ${Time[0]}`
    }

    const handleNewMessage = (text) => {
        var newMessage = {
            messageId: nanoid(),
            roomId: roomId,
            messageText: text,
            timestamp: getLocalDateAndTime(),
            author: username
        }
        connection.invoke("NotifyNewMessage", newMessage).catch(function (err) {
            return console.error(err.toString());
        });
    }

    const handleSortOnClick = (sort) => {
        if (sort === 'newest') {
            setThisRoomsMessages((thisRoomsMessages) => [...thisRoomsMessages.sort((a, b) => b.timestamp > a.timestamp)]);
        } else {
            setThisRoomsMessages((thisRoomsMessages) => [...thisRoomsMessages.sort((a, b) => a.timestamp > b.timestamp)]);
        }
    }

    const searchOnChange = (search) => {
        setSearchText(search);
    }

    useEffect(() => {
        var seachedMessages = [];
        if (searchText.trim().length !== 0) {
            thisRoomsMessages.forEach((message) => {
                if (message.messageText.split(' ').some(w => w === searchText)) {
                    seachedMessages.push(thisRoomsMessages.filter(m => m.messageId === message.messageId)[0]);
                    setThisRoomsMessages(seachedMessages);
                }
            })
        } else {
            if (messages) {
                setThisRoomsMessages(messages.filter(m => m.roomId === roomId));
            }
        }
    }, [searchText])

    if (thisRoom) {
        return (
            <div className="container-fluid">
                <RoomHeader thisRoom={thisRoom} />
                <SortAndSearch handleSortOnClick={handleSortOnClick} searchOnChange={searchOnChange} />
                {thisRoomsMessages.map((message, index) => {
                    return (
                        <Message key={message.messageId} newMessage={determineNewMessage(message.messageId)} author={message.author} side={determineRowSide(index)} boubbleTag={determineBoubbleTagSide(index)} timeStamp={message.timestamp} text={message.messageText} />
                    )
                })}
                <Footer imputField={true} defaultInputText='Nytt meddelande...' onClick={handleNewMessage} />
            </div>
        );
    }
}
export default Room