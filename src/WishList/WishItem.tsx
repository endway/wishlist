import React from "react";
import {Button, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {Wish} from "./interfaces";

import "./WishItem.css";

interface OwnProps {
  item: Wish;
  toggleWish(state: boolean): void;
}

export const WishItem: React.FunctionComponent<OwnProps> = ({item, toggleWish}) => (
  <ListItem className={(item.checked ? "w-wish-item--checked" : "")} style={{height: "56px"}}>
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

      {(item.checked ? (
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
