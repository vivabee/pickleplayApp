import React, { useEffect, useState } from 'react';
import Session from './Session';
import './Sessions.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../database/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';


export default function Sessions({ onStatusChange, onSessionRemove }) {
  const [user, loading] = useAuthState(auth);
  const [userSessions, setUserSessions] = useState([]);
  const [sessions] = useState([]);
  

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        if (!user || loading) return;

        console.log('SESSION Current user uid:', user.uid); // Log the uid here
        const sessionQuery = query(collection(db, 'session'), where('uid', '==', user.uid));
        const sessionSnapshot = await getDocs(sessionQuery);
        const sessionsData = sessionSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setUserSessions(sessionsData);
      } catch (error) {
        console.error('Error fetching user sessions:', error);
      }
    };

    fetchSessions();
  }, [user, loading, sessions]);

  return (
    <div className="sessions-container">
      <h3>Your Sessions Available</h3>
      {userSessions.length > 0 ? (
        <>
          {userSessions.map((session, index) => (
            <div key={index} className="session">
              <Session
                session={session}
                onSessionRemove={onSessionRemove}
              />
            </div>
          ))}
        </>
      ) : (
        <div>
        <h2>No current sessions, create your session to Start</h2>
        <div className='buttonArea' ><Link to="/createsession" className='button'>Create a session</Link></div>
        </div>
      )}
    </div>
  );
}
