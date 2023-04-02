import React from "react";
import { Button } from "@material-ui/core";
import { Action, useACL } from "../ACLHook";
import { hideWish } from "../database/actions";

interface OwnProps {
    id: string;
}

export const WishHide: React.FunctionComponent<OwnProps> = ({ id }) => {
    const { can } = useACL();

    if (!can(Action.hide)) {
        return null;
    }

    return (
        <Button onClick={() => hideWish(id)}>Видалити</Button>
    );
};