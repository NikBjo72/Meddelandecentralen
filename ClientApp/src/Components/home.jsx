import React, { useState, useEffect, useRef, } from 'react';
import './home.css';
import imageUrl from '../Model/Service/images';
import RoomBtn from './room-btn';
import useRoom from './Contexts/room-context';
import useUser from './Contexts/user-context';
import Footer from './footer';
import { connection } from '../Model/Service/signalr-connection';

export const Home = (props) => {
    const { rooms } = useRoom();
    const { username } = useUser();

    const handleNewRoom = (text) => {
        var newRoom = {
            Status: "in-progress",
            Name: text,
            Timestamp: new Date(),
        }
        connection.invoke("NotifyNewRoom", newRoom).catch(function (err) {
            return console.error(err.toString());
        });
    }

    return (
        <div className="container-fluid">
            <div id="headerRow" className="row sticky-top">
                <div className="col-sm-12">
                    <div className="row">
                        <img id="userIcon" src={imageUrl.accountCircle} alt="Användarikon" />
                        <div id="userName" className="text-white h2 col">{ username }</div>
                    </div>
                    <hr className="rounded white" />
                    <div className="row">
                        <div className="col text-center">
                            <img className="statusIcon" src={imageUrl.executed} alt="Statusikon" />
                            <div className="text-white small text-center">Klart</div>
                        </div>
                        <div className="col text-center">
                            <img className="statusIcon" src={imageUrl.inProgress} alt="Statusikon" />
                            <div className="text-white small text-center">Pågående</div>
                        </div>
                        <div className="col text-center">
                            <img className="statusIcon" src={imageUrl.onHold} alt="Statusikon" />
                            <div className="text-white small text-center">Väntande</div>
                        </div>
                        <div className="col text-center">
                            <img className="statusIcon" src={imageUrl.rejected} alt="Statusikon" />
                            <div className="text-white small text-center">Ur funktion</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mappar ut alla rummen som finns i API:et */}
            {rooms ?
                rooms.map((room) => {
                    return (
                        <RoomBtn key={room.roomId} status={room.status} name={room.name} newMessages={0} roomId={room.roomId} />
                    )
                })
                :
                null
            }
            <Footer defaultInputText='Nytt rum...' onClick={ handleNewRoom }/>
        </div>
    );
}
export default Home