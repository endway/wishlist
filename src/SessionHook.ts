import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";

import {auth, database} from "./firebase";
import {onAuthStateChanged} from "firebase/auth";

export enum Role {
    visitor = "visitor",
    admin = "admin",
    owner = "owner",
}

interface Session {
    uid: string;
    role: Role;
}

const visitorRole = {
    uid: "-1",
    role: Role.visitor,
}
const rolesRef = ref(database, "roles");
const getRoleFromConfig = (uid: string, config: { owner: Record<string, string>, admin: Record<string, string>}) => {
    if (Object.values(config.owner).includes(uid)) {
        return Role.owner;
    }

    if (Object.values(config.admin).includes(uid)) {
        return Role.admin;
    }

    return Role.visitor;
};

export const useSession = () => {
    const [uid, setUid] = useState<string>("");
    const [session, setSession] = useState<Session>(visitorRole);

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (!user) {
                return;
            }

            setUid(user.uid ?? "");
        });
    }, []);

    useEffect(() => {
        return onValue(rolesRef, (snapshot) => {
            const config: { owner: Record<string, string>, admin: Record<string, string>} = snapshot.val();

            setSession({
                uid,
                role: getRoleFromConfig(uid, config),
            })
        });
    }, [uid]);

    return session;
};