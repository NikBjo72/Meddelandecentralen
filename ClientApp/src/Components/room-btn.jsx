import React, { useState, useEffect, useRef, } from 'react';
import './room-btn.css';
import imageUrl from '../Model/Service/images';
import { Link } from "react-router-dom";
import { connection } from '../Model/Service/signalr-connection';

export const RoomBtn = (props) => {
    const [statusImage, setStatusImage] = useState();
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const [deleteClassSettigs, setDeleteClassSettigs] = useState('col-10')

    const handleShowDelete = () => {
        if(showDeleteBtn === true) {
            setShowDeleteBtn(false);
            setDeleteClassSettigs('col-10')
        } else {
            setShowDeleteBtn(true);
            setDeleteClassSettigs('col-8') 
        }
    }

    const handleDeleteRoom = () => {
        connection.invoke("NotifyDeleteRoom", props.roomId).catch(function (err) {
            return console.error(err.toString());
        });
    }

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
        <div className="row roomRaw">
            <div className={ deleteClassSettigs }>
                <Link to={`/room/${props.roomId}`} className="row link" >
                    <img className="roomStatusIcon" src={statusImage} alt="Statusikon" />
                    <div id="roomName" className="text-white h5 col">{props.name}</div>
                    {props.newMessages ?
                        <small className="text-white newMessages">{props.newMessages}</small>
                        :
                        null
                    }
                </Link>
            </div>
            <div className="col-2 text-center my-auto">
                <img onClick={ handleShowDelete } id="threeDots" src={imageUrl.threeDots} alt="Menyikon" />
            </div>
            {showDeleteBtn ?
                <div className="col-2">
                    <div onClick={ handleDeleteRoom } id="deleteBtn" className='row'>
                        <div id='deleteText'>Delete</div>
                    </div>
                </div>
                :
                null
            }
        </div>
    );
}
export default RoomBtn