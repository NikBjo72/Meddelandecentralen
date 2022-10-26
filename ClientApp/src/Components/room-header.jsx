import React, { useState, useEffect, useRef, } from 'react';
import './room-header.css';
import imageUrl from '../Model/Service/images';
import Dropdown from 'react-bootstrap/Dropdown';
import { EditRoom } from '../Model/Service/api-request';
import { connection } from '../Model/Service/signalr-connection';

export const RoomHeader = (props) => {
    const [roomStatus, setRoomStatus] = useState();

    const RoomStatus = () => {
        switch (props.thisRoom.status) {
            case 'executed':
                return (
                    <div className="flex-colum ">
                        <img id="executedIcon" className="statusIcon" src={imageUrl.executed} alt="Statusikon" />
                        <div className="text-white small text-center">Klart</div>
                    </div>
                )
            case 'in-progress':
                return (
                    <div className="flex-column">
                        <img id="inProgressIcon" className="statusIcon" src={imageUrl.inProgress} alt="Statusikon" />
                        <div className="text-white small text-center">Pågående</div>
                    </div>
                )
            case 'on-hold':
                return (
                    <div className="flex-column">
                        <img id="onHoldIcon" className="statusIcon" src={imageUrl.onHold} alt="Statusikon" />
                        <div className="text-white small text-center">Väntande</div>
                    </div>
                )
            case 'rejected':
                return (
                    <div className="flex-column">
                        <img id="rejectedIcon" className="statusIcon" src={imageUrl.rejected} alt="Statusikon" />
                        <div className="text-white small text-center">Ur funktion</div>
                    </div>
                )
        }
    }

    useEffect(() => {
        RoomStatus();
    },[roomStatus])

    useEffect(() => {
        console.log('props.thisRoom.status:', props.thisRoom.status);
    })

    const handleStatus = (event) => {
        props.thisRoom.status = event.target.id;
        // (async () => {
        //     EditRoom(props.thisRoom.roomId, props.thisRoom);
        // })()
        connection.invoke("NotifyNewRoom", props.thisRoom).catch(function (err) {
            return console.error(err.toString());
        });
        setRoomStatus(props.thisRoom.status);
    }

    return (
        <>
            <div id="headerRow" className="row sticky-top">
                <div className="col-sm-12">
                    <div className="row">
                        <img id="geoIcon" src={imageUrl.geoAltFill} alt="Platsikon" />
                        <div id="roomName" className="text-white h2 col">{props.thisRoom.name}</div>
                        <div className='col'>
                            <Dropdown className="d-flex flex-row-reverse">
                                <Dropdown.Toggle className="text-white" variant="white" id="dropdown-basic">
                                    <RoomStatus />
                                </Dropdown.Toggle>
                                <Dropdown.Menu id="dropdownMenu">
                                    <Dropdown.Item onClick={(event) => { handleStatus(event) }}>
                                        <img id="executed" className="statusIcon" src={imageUrl.executed} alt="Statusikon" />
                                        Klart
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={(event) => { handleStatus(event) }}>
                                        <img id="in-progress" className="statusIcon" src={imageUrl.inProgress} alt="Statusikon" />
                                        Pågående
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={(event) => { handleStatus(event) }}>
                                        <img id="on-hold" className="statusIcon" src={imageUrl.onHold} alt="Statusikon" />
                                        Väntande
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={(event) => { handleStatus(event) }}>
                                        <img id="rejected" className="statusIcon" src={imageUrl.rejected} alt="Statusikon" />
                                        Ur funktion
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <div id="filterAndSearchRow" className="row sticky-top">
                <div className="input-group">
                    <img id="sortIcon" src={imageUrl.sortDown} alt="Hem" />
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="searchInputGroup">
                            <img id="searchIcon" src={imageUrl.search} alt="Hem" />
                        </span>
                    </div>
                    <input id="searchInput" type="text" className="form-control" placeholder="Sök..." aria-label="Username" aria-describedby="basic-addon1" />
                </div>
            </div>
            <hr className="rounded black" />
        </>
    );
}
export default RoomHeader