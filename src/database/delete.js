import { collection,  doc, deleteDoc, writeBatch, getDocs } from "firebase/firestore";
import { db } from "./config";

export async function remove(id) {
    try {
        await deleteDoc(doc(db, "session", id));
        return true;
    }
    catch {
        return false
    }
}

export async function removeAllSessions() {
    try {
        const collectionRef = collection(db, "session");
        const querySnapshot = await getDocs(collectionRef);
        
        const batch = writeBatch(db);
        querySnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
        
        await batch.commit();
        return true;
    } catch (error) {
        console.error("Error removing all sessions:", error);
        return false;
    }
}

