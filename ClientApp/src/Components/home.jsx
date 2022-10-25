import React, { useState, useEffect, useRef,  } from 'react';
import './home.css';
import imageUrl from '../Model/Service/images';
import RoomBtn from './room-btn';
import useRoom from './Contexts/room-context';

export const Home = (props) => {
    const { rooms } = useRoom();

    return (
        <div className="container-fluid">
        <div id="headerRow" className="row sticky-top">
            <div className="col-sm-12">
                <div className="row">
                    <img id="userIcon" src={imageUrl.accountCircle} alt="Användarikon" />
                    <div id="userName" className="text-white h2 col">Niklas Björk</div>
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
        {rooms?
        rooms.map((room) => {
            {console.log('room.status', room.status);}
            return (
                <RoomBtn key={room.roomId} status={room.status} name={room.name} newMessages={0} roomId={room.roomId}/>
            )
        })
        :
        null
        }

        <div id="footerRow" className="row fixed-bottom">
            <div className="input-group mb-3">
                <img id="addMessageIcon" src={imageUrl.plusCircle} alt="Lägg till meddelande" />
                <input id="inputNewRoom" type="text" className="form-control" placeholder="Nytt rum..." aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="col-sm-12">
                <div className="row">
                    <div className="col text-center">
                        <img className="footerIcons" src={imageUrl.house} alt="Hem" />
                    </div>
                    <div className="col text-center">
                        <img className="footerIcons" src={imageUrl.chatSquareText} alt="Alla meddelanden" />
                    </div>
                    <div className="col text-center">
                        <img className="footerIcons" src={imageUrl.boxArrowRight} alt="Avsluta" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
export default Home