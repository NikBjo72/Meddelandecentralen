import React, { useState, useEffect, useRef, } from 'react';
import imageUrl from '../Model/Service/images';
import './all-messages.css';
import Footer from './footer';
import SortAndSearch from './sort-and-search';
import useMessage from './Contexts/message-context';
import Message from './message';


export const AllMessages = (props) => {
    const { messages } = useMessage();
    const [searchText, setSearchText] = useState('');
    const [thisRoomsMessages, setThisRoomsMessages] = useState([]);

    useEffect(() => {
        if(messages) {
            setThisRoomsMessages(messages);
        }
    },[messages])

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

    const handleSortOnClick = (sort) => {
        if (sort === 'newest') {
            setThisRoomsMessages((thisRoomsMessages) => [...thisRoomsMessages.sort((a, b) => b.timestamp > a.timestamp)]);

        } else {
            setThisRoomsMessages((thisRoomsMessages) => [...thisRoomsMessages.sort((a, b) => a.timestamp > b.timestamp)]);
        }
    }

    const searchOnChange = (search) => {
        console.log('search:', search);
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
                setThisRoomsMessages(messages);
            }
        }
    }, [searchText])

    if (messages) {
        return (
            <>
                <div id="headerRowAllMessages" className="row sticky-top">
                    <div className="col-sm-12">
                        <div className="row">
                            <img id="messageIcon" src={imageUrl.chatSquareText} alt="Platsikon" />
                            <div id="roomName" className="text-white h2 col">Alla meddelanden</div>
                        </div>
                    </div>
                </div>
                <SortAndSearch handleSortOnClick={handleSortOnClick} searchOnChange={searchOnChange} />
                {thisRoomsMessages.map((message, index) => {
                    return (
                        <Message key={message.messageId} author={message.author} side={determineRowSide(index)} boubbleTag={determineBoubbleTagSide(index)} timeStamp={message.timestamp} text={message.messageText} />
                    )
                })}
                <Footer imputField={false} />
            </>
        );
    }
}
export default AllMessages