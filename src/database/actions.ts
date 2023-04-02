import { push, ref, set, update } from "firebase/database";
import { database } from "../firebase";
import { Wish } from "../WishList/interfaces";

const listRef = ref(database, "list");

export const hideWish = (id: string) => {
    const wishRef = ref(database, `list/${id}`);

    return update(wishRef, { hide: true });
};

export const createWish = (wish: Omit<Wish, "id">) => {
    return push(listRef, wish);
};

export const toggleChecked = (id: string, checked: boolean) => {
    const checkedRef = ref(database, `reservations/${id}`);

    return set(checkedRef, checked);
};
