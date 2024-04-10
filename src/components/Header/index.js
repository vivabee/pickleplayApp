import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import MainMenu from '../MainMenu';
import DashboardMenu from '../DashboardMenu'; 
import logo from '../assets/pickleplay_logo.png'; 

export default function Header({ isLoggedIn }) { 
    return (
    <>
        <header>
                <Link to="/" className='logo'>
                    <img src={logo} alt="PicklePlay Logo" />
                </Link>
            <div className='title'>PicklePlay</div>
            <div className='subtitle'>A Pickleball Session Organization App</div>
        </header>
        {isLoggedIn ? <DashboardMenu /> : <MainMenu />}
    </>
    );
}
