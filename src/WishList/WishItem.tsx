import React from "react";
import {Button, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {Wish} from "./interfaces";

import "./WishItem.css";

interface OwnProps {
  item: Wish;
  checked: boolean;
  toggleWish(state: boolean): void;
}

export const WishItem: React.FunctionComponent<OwnProps> = ({item, checked, toggleWish}) => (
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

      {(checked ? (
        <Button color="primary" onClick={() => toggleWish(false)}>
          Повернути
        </Button>
      ) : (
        <Button color="primary" onClick={() => toggleWish(true)}>
          Викреслити
        </Button>
      ))}
    </ListItemSecondaryAction>
  </ListItem>
);
