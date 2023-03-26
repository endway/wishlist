import { Migration } from "./Migration";
import { database } from "../../firebase";
import { get, ref, runTransaction } from "firebase/database";

export class ExtractCheckedState001 implements Migration {
    async up() {
        const listSnap = await get(ref(database, "list"));
        const list = listSnap.val();

        await runTransaction(ref(database, "reservations"), (currentData: Record<string, boolean>) => {
            Object.keys(list).forEach((wishId) => {
                currentData[wishId] = list[wishId].checked ?? false;
            });

            return currentData;
        })
    }
}