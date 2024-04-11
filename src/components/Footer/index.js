import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import logo from '../assets/pickleplay_logo.png'; 

export default function Footer({ isLoggedIn }) { 
    return (
    <>
        <footer>
                <Link to="/" className='logo-footer'>
                    <img src={logo} alt="PicklePlay Logo" />
                </Link>
            <div className='title'>PicklePlay</div>
            <div className='subtitle'>A Pickleball Session Organization App</div>
        </footer>
    </>
    );
}
