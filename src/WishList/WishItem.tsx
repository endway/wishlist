import React from "react";
import {Button, Hidden, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import { Wish } from "./interfaces";

import "./WishItem.css";
import { WishHide } from "./WishHide";
import { WishEdit } from "./WishEdit";
import { WishReserve } from "./WishReserve";
import {WishMenuMobile} from "./WishMenuMobile";

interface OwnProps {
    item: Wish;
    categories: string[];
    checked: boolean;
}

export const WishItem: React.FunctionComponent<OwnProps> = ({item, categories, checked }) => (
    <ListItem className={(checked ? "w-wish-item--checked" : "")} style={{minHeight: "56px"}}>
        <Hidden xsDown>
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
                <WishEdit item={item} categories={categories}/>
                <WishHide id={item.id}/>
            </ListItemSecondaryAction>
        </Hidden>

        <Hidden smUp>
            <ListItemText
                className="w-wish-item__text"
                primary={item.label}
                primaryTypographyProps={{noWrap: false}}
                secondary={`${item.price} грн`}
            />
            <WishMenuMobile item={item} categories={categories} checked={checked} />
        </Hidden>
    </ListItem>
);
