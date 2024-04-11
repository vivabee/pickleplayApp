import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../database/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import "./Profile.scss";
export default function Profile() {
  const [user, loading] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState(null); // State to hold user information

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user || loading) return;

        // Fetch user information from the "users" collection
        const userQuery = query(collection(db, 'users'), where('uid', '==', user.uid));
        const userSnapshot = await getDocs(userQuery);
        const userData = userSnapshot.docs.map(doc => doc.data())[0]; // Get the first document's data
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
    </div>
  );
}
