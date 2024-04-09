import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import MainMenu from '../MainMenu';
import DashboardMenu from '../DashboardMenu'; // Import the DashboardMenu component
import logo from '../assets/pickleplay_logo.png'; // Import your logo image

export default function Header({ isLoggedIn }) { // Pass isLoggedIn prop to determine which menu to render
    return (
    <>
        <header>
                <Link to="/" className='logo'>
                    <img src={logo} alt="PicklePlay Logo" />
                </Link>
            <div className='title'>PicklePlay</div>
            <div className='subtitle'>Uniting Paddle and Ball in Sport</div>
        </header>
        {isLoggedIn ? <DashboardMenu /> : <MainMenu />} {/* Render DashboardMenu if logged in, otherwise render MainMenu */}
    </>
    );
}
