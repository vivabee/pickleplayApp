/* import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "./components/Header";
import Login from "./components/Account/Login";
import Sessions from "./components/Sessions";
import Forms from "./components/Forms";
import Loading from "./components/Loading";
import HomePage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Team from "./pages/Team";
import * as database from './database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './database/config';
import Register from "./components/Account/Register"; 
import AddPlayer from "./components/Forms/Addplayer";

export default function App() {
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user] = useAuthState(auth); // Get user object from authentication
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await database.load();
                setSessions(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading sessions:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        console.log('User:', user);
    }, [user]); 
    
    const handleAddSession = async (description, status, courtName, dateTime, orgName) => {
        try {
            if (user) {
                // Pass the user object to addSession function
                const newSession = await database.addSession(description, status, courtName, dateTime, orgName, user);
                if (newSession) {
                    setSessions([...sessions, newSession]);
                    // After adding a session, navigate to the sessions page
                    navigate('/sessions');
                } else {
                    console.error('Failed to add session');
                }
            } else {
                console.error('User not logged in');
            }
        } catch (error) {
            console.error('Error adding session:', error);
        }
    };

    return (
        <>
            <Header isLoggedIn={user !== null} />
        
            {isLoading ? (
                <Loading />
            ) : (
                <div className="app-container">
                    <div className="left-column">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            {user && (
                                <>
                                    <Route
                                        path='/createsession'
                                        element={<Forms onAddSession={handleAddSession} />}
                                    />
                                    <Route
                                        path='/sessions'
                                        element={<Sessions sessions={sessions} />}
                                    />
                                { <Route path="/addplayer/:sessionId" element={<AddPlayer />} /> }
                                </>
                            )}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/team" element={<Team />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </div>
                </div>
            )}
        </>
    );
}
 */

import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Account/Login";
import Sessions from "./components/Sessions";
import Forms from "./components/Forms";
import Loading from "./components/Loading";
import HomePage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Team from "./pages/Team";
import * as database from './database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './database/config';
import Register from "./components/Account/Register"; 
import AddPlayer from "./components/Forms/Addplayer";

export default function App() {
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user] = useAuthState(auth); // Get user object from authentication
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await database.load();
                setSessions(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading sessions:', error);
                setIsLoading(false);
            }
        };

        fetchData();
        // Update isLoggedIn state based on user authentication
        // Update isLoggedIn state based on user authentication
        setIsLoggedIn(user !== null);
    }, [user]);

    
    const handleAddSession = async (description, status, courtName, dateTime, orgName) => {
        try {
            if (user) {
                // Pass the user object to addSession function
                const newSession = await database.addSession(description, status, courtName, dateTime, orgName, user);
                if (newSession) {
                    setSessions([...sessions, newSession]);
                    // After adding a session, navigate to the sessions page
                    navigate('/sessions');
                } else {
                    console.error('Failed to add session');
                }
            } else {
                console.error('User not logged in');
            }
        } catch (error) {
            console.error('Error adding session:', error);
        }
    };

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
        
            {isLoading ? (
                <Loading />
            ) : (
                <div className="app-container">
                    <div className="left-column">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            {user ? (
                                <>
                                    <Route path="/createsession" element={<Forms onAddSession={handleAddSession} />} />
                                    <Route path="/sessions" element={<Sessions sessions={sessions} />} />
                                    {/* <Route path="/addplayer" element={<AddPlayer />} /> */}
                                    <Route path="/addplayer/:sessionId" element={<AddPlayer />} />
                                    <Route path="/team" element={<Team />} />
                                </>
                            ) : (
                                <>
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                </>
                            )}
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}
