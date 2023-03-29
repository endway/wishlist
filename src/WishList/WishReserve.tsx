import React, { useCallback } from "react";
import { Button } from "@material-ui/core";
import { ref, set } from "firebase/database";
import { database } from "../firebase";

interface OwnProps {
    id: string;
    checked: boolean;
}

export const WishReserve: React.FunctionComponent<OwnProps> = ({ id, checked }) => {
    const toggleChecked = useCallback((checked: boolean) => {
        const checkedRef = ref(database, `reservations/${id}`);

        set(checkedRef, checked).catch(console.error);
    }, [id]);

    if (checked) {
        return (
            <Button color="primary" onClick={() => toggleChecked(false)}>
                Повернути
            </Button>
        );
    }

    return (
        <Button color="primary" onClick={() => toggleChecked(true)}>
            Викреслити
        </Button>
    );
};