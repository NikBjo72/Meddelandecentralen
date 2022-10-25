import React, { useState, useEffect, useRef,  } from 'react';
import './home.css';
import imageUrl from '../Model/Service/images';
import { GetRooms } from '../Model/Service/api-request';

export const Home = (props) => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
    (async () => {
            setRooms(await GetRooms());
        })();
    },[])

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
                        <img className="statusIcon" src={imageUrl.exedcuted} alt="Statusikon" />
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
        <div className="row roomRaw">
            <img className="roomStatusIcon" src={imageUrl.exedcuted} alt="Statusikon" />
            <div id="userName" className="text-white h5 col">Konferensrum Kråkan</div>
        </div>
        <div className="row roomRaw">
            <img className="roomStatusIcon" src={imageUrl.onHold} alt="Statusikon" />
            <div id="userName" className="text-white h5 col">Köket</div>
            <small className="text-white newMessages">2</small>
        </div>
        <div className="row roomRaw">
            <img className="roomStatusIcon" src={imageUrl.rejected} alt="Statusikon" />
            <div id="userName" className="text-white h5 col">Rum 453</div>
            <small className="text-white newMessages">1</small>
        </div>
        <div className="row roomRaw">
            <img className="roomStatusIcon" src={imageUrl.inProgress} alt="Statusikon" />
            <div id="userName" className="text-white h5 col">Hotellobby</div>
            <small className="text-white newMessages">6</small>
        </div>
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