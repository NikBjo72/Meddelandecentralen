import React, { useState, useEffect, useRef, } from 'react';
import './message.css';

export const Message = (props) => {


    return (
        <div className={`row ${props.side}`}>
            <div className={`box ${props.boubbleTag} ${props.newMessage}`}>
                <div className="messageHeader">
                    <small className="messageAuthor">{props.author}</small>
                    <small className="timestamp">{props.timeStamp}</small>
                </div>
                <p className="message">
                    {props.text}
                </p>
            </div>
        </div>
    );
}
export default Message