import { doc, updateDoc} from "firebase/firestore";
import { db } from "./config";

export async function updateStatus(id, newValue, fieldToUpdate) {
    try {
        const docRef = doc(db, "session", id);
        if (newValue !== undefined && fieldToUpdate !== undefined) {
            await updateDoc(docRef, {
                [fieldToUpdate]: newValue
            });
            return true; 
        } else {
            console.error("Invalid newValue or fieldToUpdate.");
            return false; 
        }
    }
    catch (error) {
        console.error("Error on editing document: ", error);
        return false; 
    }
}
