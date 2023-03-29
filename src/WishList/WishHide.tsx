import React from "react";
import { IconButton } from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";
import { ref, update } from "firebase/database";

import { Role, useSession } from "../SessionHook";
import { database } from "../firebase";

interface OwnProps {
    id: string;
}

export const WishHide: React.FunctionComponent<OwnProps> = ({ id }) => {
    const { role } = useSession();

    if (![Role.admin, Role.owner].includes(role)) {
        return null;
    }

    const hideWish = () => {
        const wishRef = ref(database, `list/${id}`);
        update(wishRef, { hide: true });
    };

    return (
        <IconButton style={{marginLeft: 8}} onClick={hideWish}>
            <RemoveCircle />
        </IconButton>
    );
};