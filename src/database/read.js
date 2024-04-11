import { collection, getDocs, getDoc, doc, query,where } from 'firebase/firestore';
import { auth, db } from './config';
import { signOut } from "firebase/auth"; // Import the signOut function from "firebase/auth"

export async function load() {
  try {
    if (!auth.currentUser) return [];

    const querySnapshot = await getDocs(collection(db, 'session'));
    return processQuerySnapshot(querySnapshot);
  } catch (error) {
    console.error('Failed to load user sessions:', error);
    throw new Error('Failed to load user sessions');
  }
}
async function processQuerySnapshot(querySnapshot) {
  const data = [];

  // Iterate over each session document
  for (const doc of querySnapshot.docs) {
    // Extract session data
    const sessionData = {
      id: doc.id,
      ...doc.data(),
    };

    // Include player data if available
    if (sessionData.players) {
      // Fetch player data from the database based on player IDs
      const playerData = await fetchPlayerData(sessionData.players);
      // Add player data to the session object
      sessionData.players = playerData;
    }

    data.push(sessionData);
  }

  return data;
}

async function fetchPlayerData(playerIds) {
  const playerData = [];

  // Fetch player documents from the database based on player IDs
  for (const playerId of playerIds) {
    const playerDoc = await getDoc(doc(db, 'players', playerId));
    if (playerDoc.exists()) {
      playerData.push(playerDoc.data());
    }
  }

  return playerData;
}

export async function logout() { 
  try {
      await signOut(auth); 
      return true;
  }
  catch (error) {
      console.error(error);
      throw new Error(`Failed: ${error.message}`); 
    
  }
}


export async function load2(sessionId) {
  try {
    // Fetch the session document based on session ID
    const sessionDoc = await getDoc(doc(db, 'session', sessionId));
    
    if (!sessionDoc.exists()) {
      // Session document not found, return undefined
      return undefined;
    }

    // Extract session data
    const sessionData = {
      id: sessionDoc.id,
      ...sessionDoc.data(),
    };

    return sessionData; // Return session data
  } catch (error) {
    console.error('Failed to load session data:', error);
    throw new Error('Failed to load session data');
  }
}

export async function loadUser() {
  try {
    if (!auth.currentUser) return null;

    // Fetch user information from the Firestore database
    const userQuery = query(collection(db, 'users'), where('uid', '==', auth.currentUser.uid));
    const userSnapshot = await getDocs(userQuery);
    const userData = userSnapshot.docs.map(doc => doc.data())[0]; // Get the first document's data
    return userData;
  } catch (error) {
    console.error('Failed to load user data:', error);
    throw new Error('Failed to load user data');
  }
}