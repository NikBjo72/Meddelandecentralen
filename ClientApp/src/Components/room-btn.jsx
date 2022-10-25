import React, { useState, useEffect, useRef, } from 'react';
import './room-btn.css';
import imageUrl from '../Model/Service/images';
import { Link } from "react-router-dom";

export const RoomBtn = (props) => {
    const [statusImage, setStatusImage] = useState();

    useEffect(() => {
        switch (props.status) {
            case 'executed':
                setStatusImage(imageUrl.executed)
                break;
            case 'in-progress':
                setStatusImage(imageUrl.inProgress)
                break;
            case 'on-hold':
                setStatusImage(imageUrl.onHold)
                break;
            case 'rejected':
                setStatusImage(imageUrl.rejected)
                break;
        }
    });

    return (
        <Link to={`/room/${props.roomId}`} className="row roomRaw">
            <img className="roomStatusIcon" src={statusImage} alt="Statusikon" />
            <div id="roomName" className="text-white h5 col">{props.name}</div>
            {props.newMessages?
            <small className="text-white newMessages">{props.newMessages}</small>
            :
            null
            }
        </Link>
    );
}
export default RoomBtn