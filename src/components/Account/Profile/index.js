import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../database/config';
import { loadUser } from '../../../database/read'; 
import "./Profile.scss";
import userAvatar from '../../assets/player1.png';

export default function Profile() {
  const [user, loading] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user || loading) return;

        const userData = await loadUser();
        setUserInfo(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user, loading]);

  return (
    <div className="profile-container">
      {userInfo && (
        <div>
          <h2>User Profile</h2>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
        </div>
      )}
        <div>
        <img src={userAvatar} alt="User" />
        </div>
    </div>
  );
}
