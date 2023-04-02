import React from "react";
import { Button } from "@material-ui/core";
import { toggleChecked } from "../database/actions";

interface OwnProps {
    id: string;
    checked: boolean;
}

export const WishReserve: React.FunctionComponent<OwnProps> = ({ id, checked }) => {
    if (checked) {
        return (
            <Button color="primary" onClick={() => toggleChecked(id, false)}>
                Повернути
            </Button>
        );
    }

    return (
        <Button color="primary" onClick={() => toggleChecked(id, true)}>
            Викреслити
        </Button>
    );
};