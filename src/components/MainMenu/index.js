import React from "react";
import { Link } from "react-router-dom";
import './index.scss';

export default function MainMenu() {
   
    return (
        <nav className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/login">Login/Register</Link>
            <Link to="/team">Team</Link>

        </nav>
    );
}
