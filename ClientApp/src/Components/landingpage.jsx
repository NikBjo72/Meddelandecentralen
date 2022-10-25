import React, { useState, useEffect, useRef,  } from 'react';
import './landingpage.css';
import imageUrl from '../Model/Service/images';
import useUser from '../Components/Contexts/user-context';

export const Landingpage = (props) => {
    const { setUsername, setLoggedIn } = useUser();
    const [input, setInput] = useState('');

    const inputOnChangeHandler = (event) => {
        setInput(event.target.value);
    }

    const connectOnClick = () => {
        setUsername(input);
        setLoggedIn(true);
    }

    useEffect(() => {
        console.log('input:', input);
    })

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-sm-6 landingPageCol">
                <img id="chatBubbles" src={imageUrl.chatBubbles} alt="Chat icons" />
            </div>
            <div id="connectContainer" className="col-sm-6 landingPageCol">
                <label className="text-white mx-2 h5" htmlFor="inputName">Namn</label>
                <div className="input-group input-group-lg mb-3">
                    <input id="inputName" onChange={ (event) => {inputOnChangeHandler(event)} } type="text" className="form-control" placeholder="Namn" value={input} aria-label="Username" />
                </div>
                <button id="connectBtn" onClick={connectOnClick} type="button" className="btn btn-primary my-3">Anslut</button>
            </div>
        </div>
        <footer className="text-white text-center fixed-bottom py-3 lead">
            © Niklas Björk WU21 2022
        </footer>
    </div>
    );
}
export default Landingpage