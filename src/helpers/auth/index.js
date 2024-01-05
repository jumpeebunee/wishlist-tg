import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";

const createUserData = async (id) => {
  const user = {
    wishlist: [],
    isCreatingWishlist: 0,
  };

  const docRef = doc(db, "users", id.toString());
  await setDoc(docRef, user);
};

export const checkUserIsAvailable = async (id) => {
  const docRef = doc(db, "users", id.toString());
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return await createUserData(id);
};
