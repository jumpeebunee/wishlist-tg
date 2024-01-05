import { db } from "../../firebase.js";
import { doc, getDoc } from "firebase/firestore";

export async function getWishlists(id) {
  const docRef = doc(db, "users", id.toString());
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  return data;
}

export function formatWishlists(data) {
  const formatted = data.wishlist.map((value, index) => {
    const formattedValue = `${index + 1}. ${value}`;
    return formattedValue.trim();
  });

  return formatted.join("\n");
}
