import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Action, useACL } from "../ACLHook";
import { Wish } from "./interfaces";
import { WishDialog } from "./WishDialog";

interface OwnProps {
    item: Wish;
    categories: string[];
}

export const WishEdit: React.FunctionComponent<OwnProps> = ({ item, categories }) => {
    const { can } = useACL();
    const [open, setOpen] = useState(false);

    if (!can(Action.edit)) {
        return null;
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>Редагувати</Button>

            <WishDialog
                open={open}
                onClose={() => setOpen(false)}
                wish={item}
                categories={categories}
            />
        </>
    );
};
