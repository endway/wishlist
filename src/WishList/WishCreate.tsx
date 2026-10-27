import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { Action, useACL } from "../ACLHook";
import { WishDialog } from "./WishDialog";

interface OwnProps {
    category: string;
    categories: string[];
}

export const WishCreate: React.FunctionComponent<OwnProps> = ({ category, categories }) => {
    const { can } = useACL();
    const [open, setOpen] = useState(false);

    if (!can(Action.create)) {
        return null;
    }

    return (
        <>
            <IconButton style={{marginLeft: 8}} onClick={() => setOpen(true)}>
                <AddCircle color={"primary"} />
            </IconButton>

            <WishDialog
                open={open}
                onClose={() => setOpen(false)}
                category={category}
                categories={categories}
            />
        </>
    );
};
