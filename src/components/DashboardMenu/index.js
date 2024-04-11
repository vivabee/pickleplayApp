import React from "react";
import { Link } from "react-router-dom";
import './index.scss';
import { logout } from '../../database/read';

export default function DashboardMenu() {
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <nav className="main-nav">
            <Link to="/createsession">Create Session</Link>
            <Link to="/sessions">Session</Link>
            <Link to="/profile" >My Profile </Link>
            <Link to="/login" onClick={handleLogout} >Logout </Link>
        </nav>
    );
}
