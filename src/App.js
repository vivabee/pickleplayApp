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
import Profile from "./components/Account/Profile";

export default function App() {
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user] = useAuthState(auth); 
    const navigate = useNavigate(); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

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
        setIsLoggedIn(user !== null);
    }, [user]);


    const handleAddSession = async (description, status, courtName, dateTime, orgName) => {
        try {
            if (user) {
                const newSession = await database.addSession(description, status, courtName, dateTime, orgName, user);
                if (newSession) {
                    setSessions([...sessions, newSession]);
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

    const handleSessionRemove = async (id) => {
        const filteredSessions = sessions.filter(session => session.id !== id);
        setSessions(filteredSessions);

        const removed = await database.remove(id);
        if (!removed) {
            console.error('Failed to remove session with ID:', id);
        }
    }


    return (
        <>
            <Header isLoggedIn={isLoggedIn} userName={user?.name} />

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
                                    <Route
                                        path="/sessions"
                                        element={<Sessions sessions={sessions} onSessionRemove={handleSessionRemove} />}
                                    />
                                    <Route path="/addplayer/:sessionId" element={<AddPlayer />} />
                                    <Route path="/profile" element={<Profile />} />
                                </>
                            ) : (
                                <>
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/team" element={<Team />} />
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
