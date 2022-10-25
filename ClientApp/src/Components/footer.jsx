import React, { useState, useEffect, useRef, } from 'react';
import './footer.css';
import imageUrl from '../Model/Service/images';
import { Link } from "react-router-dom";
import useUser from './Contexts/user-context';

export const Footer = (props) => {
    const { setLoggedIn } = useUser();
    const [input, setInput] = useState('');

    const inputOnChangeHandler = (event) => {
        setInput(event.target.value);
    }

    const sendMessageOnClick = () => {
        props.onClick(input);
        setInput('');
    }

    return (
        <div id="footerRow" className="row fixed-bottom">
            {props.imputField ?
                <div className="input-group mb-3">
                    <img onClick={ sendMessageOnClick } id="addMessageIcon" src={imageUrl.plusCircle} alt="Lägg till meddelande" />
                    <input id="inputNewRoom" value={input} onChange={inputOnChangeHandler} type="text" className="form-control" placeholder={props.defaultInputText} aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                :
                null
            }
            <div className="col-sm-12">
                <div className="row">
                    <Link to={`/home`} className="col text-center">
                        <img className="footerIcons" src={imageUrl.house} alt="Hem" />
                    </Link>
                    <Link to={`/all-messages`} className="col text-center">
                        <img className="footerIcons" src={imageUrl.chatSquareText} alt="Alla meddelanden" />
                    </Link>
                    <div onClick={() => { setLoggedIn(false) }} className="col text-center">
                        <img className="footerIcons" src={imageUrl.boxArrowRight} alt="Avsluta" />
                    </div>
                </div>
            </div>
        </div>
    );
}
Footer.defaultProps = {
    imputField: true,
}
export default Footer