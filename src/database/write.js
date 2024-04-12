import { collection, addDoc, updateDoc, doc, runTransaction } from "firebase/firestore";
import { auth, db } from "./config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function save(data, sessionId) {
    try {
        const docRef = doc(db, 'session', sessionId);
        await updateDoc(docRef, {
            players: data // Update the players field with the new data
        });
        return true; // Return true if update is successful
    } catch (error) {
        console.error("Error updating document: ", error);
        return false; // Return false if update fails
    }
}

export async function save2(playerName, sessionId) {
    try {
        const docRef = doc(db, 'session', sessionId);

        await runTransaction(db, async (transaction) => {
            const docSnapshot = await transaction.get(docRef);
            const playersArray = docSnapshot.data().players || [];
            const updatedPlayers = [...playersArray, playerName];

            transaction.update(docRef, { players: updatedPlayers });
        });

        return true; // Return true if update is successful
    } catch (error) {
        console.error("Error updating document: ", error);
        return false; // Return false if update fails
    }
}

export async function addSession(description, status, courtName, dateTime, orgName, user) {
    try {
        const docRef = await addDoc(collection(db, 'session'), {
            description: description,
            status: status,
            courtName: courtName,
            dateTime: dateTime,
            orgName: orgName,
            uid: user.uid // Include uid when adding session
        });
        return docRef.id; // Return the document ID
    } catch (error) {
        console.error("Error adding session: ", error);
        return null;
    }
}

export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      // Register the user with Firebase Authentication
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
  
      // Add user information to Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
  
      // Navigate to the '/createsession' page after successful registration
      return true; // Indicate successful registration
    } catch (err) {
      // Log and handle registration errors
      console.error("Registration Error:", err);
      alert(err.message);
      return false; // Indicate failed registration
    }
  };