import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const saveUserToFirestore = async (userId: string, userData: object) => {
  try {
    await setDoc(doc(db, 'users', userId), userData);
  } catch (error) {
    console.error('Error saving user to Firestore: ', error);
  }
};
