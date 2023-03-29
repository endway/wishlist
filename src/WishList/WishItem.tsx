import React from "react";
import { Button, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import { Wish } from "./interfaces";

import "./WishItem.css";
import { WishHide } from "./WishHide";
import { WishReserve } from "./WishReserve";

interface OwnProps {
    item: Wish;
    checked: boolean;
}

export const WishItem: React.FunctionComponent<OwnProps> = ({item, checked }) => (
    <ListItem className={(checked ? "w-wish-item--checked" : "")} style={{height: "56px"}}>
        <ListItemText
            className="w-wish-item__text"
            primary={item.label}
            primaryTypographyProps={{noWrap: true}}
            secondary={`${item.price} грн`}
        />

        <ListItemSecondaryAction>
            <Button
                color="secondary"
                href={item.url}
                target="_blank"
            >
                Відкрити
            </Button>

            <WishReserve id={item.id} checked={checked}/>
            <WishHide id={item.id}/>
        </ListItemSecondaryAction>
    </ListItem>
);
