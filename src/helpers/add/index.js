import { db } from "../../firebase.js";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";

export async function addToWishlist(id, msg) {
  const docRef = doc(db, "users", id.toString());

  await updateDoc(docRef, {
    wishlist: arrayUnion(msg.text),
  });

  console.log("senbd");
}
