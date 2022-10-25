import React, { useState, useEffect, useRef, } from 'react';
import './room.css';
import imageUrl from '../Model/Service/images';
import useRoom from './Contexts/room-context';
import { useLocation } from 'react-router-dom';
import RoomHeader from './room-header';

export const Room = (props) => {
    const { rooms } = useRoom();
    const location = useLocation();
    const [roomId, setRoomId] = useState(location.pathname.split('/')[2]);
    const [thisRoom, setThisRoom] = useState();

    useEffect(() => {
        if(rooms) {
            setThisRoom(rooms.find(r => r.roomId === roomId));
        }
        console.log('location', location);
        console.log('roomId', roomId);
    },[rooms])

    if (thisRoom) {
        return (
            <div className="container-fluid">
                <RoomHeader thisRoom={thisRoom} />
                <div className="row right">
                    <div className="box sb-right">
                        <div className="messageHeader">
                            <small className="messageAuthor">Niklas Björk</small>
                            <small className="timestamp">2022-10-12 19:15</small>
                        </div>
                        <p className="message">
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue. Cras mattis consectetur purus sit amet fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                </div>
                <div className="row left">
                    <div className="box sb-left newMessage">
                        <div className="messageHeader">
                            <small className="messageAuthor">Viktor Lyresten</small>
                            <small className="timestamp">2022-10-13 12:01</small>
                        </div>
                        Donec ullamcorper nulla non metus auctor fringilla. Maecenas faucibus mollis interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit tempus porttitor.
                    </div>
                </div>
                <div className="row right">
                    <div className="box sb-right">
                        <div className="messageHeader">
                            <small className="messageAuthor">Niklas Björk</small>
                            <small className="timestamp">2022-10-12 19:15</small>
                        </div>
                        <p className="message">
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue. Cras mattis consectetur purus sit amet fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                </div>
                <div className="row left">
                    <div className="box sb-left newMessage">
                        <div className="messageHeader">
                            <small className="messageAuthor">Viktor Lyresten</small>
                            <small className="timestamp">2022-10-13 12:01</small>
                        </div>
                        Donec ullamcorper nulla non metus auctor fringilla. Maecenas faucibus mollis interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit tempus porttitor.
                    </div>
                </div>
                <div className="row right">
                    <div className="box sb-right">
                        <div className="messageHeader">
                            <small className="messageAuthor">Niklas Björk</small>
                            <small className="timestamp">2022-10-12 19:15</small>
                        </div>
                        <p className="message">
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue. Cras mattis consectetur purus sit amet fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
export default Room