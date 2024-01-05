export async function editWishlist(wishlist) {
  const size = wishlist.wishlist.length;

  const items = [];

  for (let i = 0; i < size; i++) {
    const text = i + 1;
    const callback_data = `res-${i + 1}`;

    items.push({ text, callback_data });
  }

  const mrkp = JSON.stringify({
    inline_keyboard: [items, [{ text: "Отменить", callback_data: "cancel" }]],
  });
}
